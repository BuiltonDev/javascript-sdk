const agent = require('superagent');
const jwtDecode = require('jwt-decode');

class Request {
  constructor(endpoint, { apiKey, bearerToken }, refreshBearerFn) {
    this.apiKey = apiKey;
    this.bearerToken = bearerToken;
    this.endpoint = endpoint;
    this.refreshBearerFn = refreshBearerFn;
    this.refreshTokenPromise = null;
  }

  static isJWTAlive(token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      return !((typeof decoded.exp !== 'undefined' && decoded.exp < now)
        || (typeof decoded.nbf !== 'undefined' && decoded.nbf > now));
    } catch (e) {
      return false;
    }
  }

  _constructHeaders() {
    const headers = {
      'X-Builton-API-Key': this.apiKey,
    };
    if (this.bearerToken) {
      headers.Authorization = `Bearer ${this.bearerToken}`;
    }
    return headers;
  }

  getHeaders() {
    if (this.bearerToken && !Request.isJWTAlive(this.bearerToken) && this.refreshBearerFn) {
      if (!this.refreshTokenPromise) {
        this.refreshTokenPromise = this.refreshBearerFn().then((bearerToken) => {
          this.bearerToken = bearerToken;
          this.refreshTokenPromise = null;
          return this._constructHeaders();
        }).catch((err) => {
          throw err;
        });
      }
      return this.refreshTokenPromise;
    }
    return Promise.resolve(this._constructHeaders());
  }

  static serialize(params) {
    const str = [];
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
      }
    });
    return str.length ? `?${str.join('&')}` : '';
  }

  query({
    type = 'get',
    path = '',
    urlParams = {},
    body = undefined,
    headers = {},
    endpoint = this.endpoint,
    isJsonBody = true,
  } = {}) {
    const url = `${endpoint}/${path}${Request.serialize({ ...urlParams })}`;
    return this.getHeaders().then((queryHeaders) => agent[type](url)
      .set({ ...queryHeaders, ...headers })
      .set(isJsonBody ? { 'Content-Type': 'application/json' } : {}) // when empty, SuperAgent generates it automatically.
      .send(isJsonBody ? JSON.stringify(body) : body));
  }
}

module.exports = Request;

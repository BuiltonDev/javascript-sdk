const request = require('superagent');
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
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return !((typeof decoded.exp !== 'undefined' && decoded.exp < now)
      || (typeof decoded.nbf !== 'undefined' && decoded.nbf > now));
  }

  _constructHeaders() {
    const headers = {
      'X-Kvass-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };
    if (this.bearerToken) {
      headers.Authorization = `Bearer ${this.bearerToken}`;
    }
    return headers;
  }

  getHeaders() {
    if (!Request.isJWTAlive(this.bearerToken) && this.refreshBearerFn) {
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
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
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
  } = {}, parseJson, done) {
    let promise;
    let promiseResolve;
    let promiseReject;
    if (!done) {
      promise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });
    }
    try {
      return this.getHeaders().then((queryHeaders) => {
        request[type](`${endpoint}${path}${Request.serialize(urlParams)}`)
          .set(Object.assign({}, queryHeaders, headers))
          .send(JSON.stringify(body))
          .end((err, res) => {
            if (err || !res.ok) {
              if (!done) {
                return promiseReject(err, res);
              }
              return done(err, null, res);
            }
            try {
              const result = parseJson(res);
              if (!done) {
                return promiseResolve(result.obj, result.res);
              }
              return done(null, result.obj, result.res);
            } catch (error) {
              if (!done) {
                return promiseReject(error, res);
              }
              return done(error, null, res);
            }
          });
        return promise;
      });
    } catch (err) {
      if (!done) {
        return promiseReject(err);
      }
      return done(err);
    }
  }
}

module.exports = Request;

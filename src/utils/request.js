const request = require('./superagent');

let r;

class Request {
  constructor(endpoint, headers) {
    this.headers = headers;
    this.endpoint = endpoint;
  }

  static serialize(params) {
    const str = [];
    Object.keys(params).forEach((key) => {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    });
    return str.length ? `?${str.join('&')}` : '';
  }

  query({ type = 'get', resource = '', urlParams = {}, body = null, headers = {}, endpoint = this.endpoint }, done) {
    request[type](`${endpoint}${resource}${Request.serialize(urlParams)}`)
      .set(Object.assign({}, this.headers, headers, { 'Content-Type': 'application/json' }))
      .send(JSON.stringify(body))
      .end(done);
  }
}

// Singleton
module.exports = (apiKey, bearerToken) => {
  if (!r) {
    r = new Request(apiKey, bearerToken);
  }

  return r;
};

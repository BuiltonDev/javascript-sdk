const request = require('./utils/request');
const Error = require('./utils/error');

const Order = require('./collection/order');
const Product = require('./collection/product');
const Provider = require('./collection/provider');
const Tag = require('./collection/tag');
const User = require('./collection/user');
const Company = require('./collection/company');
const Payment = require('./collection/payment');
const PaymentMethod = require('./collection/paymentMethod');

let instance;

class ShareActor {
  constructor({ apiKey, bearerToken, endpoint } = {}) {
    if (instance) {
      return instance;
    }
    if (!endpoint) {
      throw new Error.MethodNeedsArg('endpoint');
    }
    if (!apiKey) {
      throw new Error.MethodNeedsArg('apiKey');
    }

    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.bearerToken = bearerToken;

    request(this.endpoint, this._constructHeaders());

    this.product = props => new Product(props);
    this.provider = props => new Provider(props);
    this.user = props => new User(props);
    this.order = props => new Order(props);
    this.tag = props => new Tag(props);
    this.company = props => new Company(props);
    this.payment = props => new Payment(props);
    this.paymentMethod = props => new PaymentMethod(props);

    instance = this;
  }

  refreshBearerToken(newBearerToken) {
    this.bearerToken = newBearerToken;
    request().updateHeaders(this._constructHeaders());
  }

  _constructHeaders() {
    const headers = {
      'X-Share-API-Key': this.apiKey,
    };
    if (this.bearerToken) {
      headers.Authorization = `Bearer ${this.bearerToken}`;
    }
    return headers;
  }
}

module.exports = ShareActor;

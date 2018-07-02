const request = require('./utils/request');
const Error = require('./utils/error');

const AIModel = require('./collection/aiModel');
const Company = require('./collection/company');
const Event = require('./collection/event');
const Order = require('./collection/order');
const Payment = require('./collection/payment');
const PaymentMethod = require('./collection/paymentMethod');
const Plan = require('./collection/plan');
const Product = require('./collection/product');
const Provider = require('./collection/provider');
const Resource = require('./collection/resource');
const Subscription = require('./collection/subscription');
const Tag = require('./collection/tag');
const User = require('./collection/user');
const Webhook = require('./collection/webhook');

let instance;

class Kvass {
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

    this.aiModel = props => new AIModel(props);
    this.company = props => new Company(props);
    this.event = props => new Event(props);
    this.order = props => new Order(props);
    this.payment = props => new Payment(props);
    this.paymentMethod = props => new PaymentMethod(props);
    this.plans = props => new Plan(props);
    this.product = props => new Product(props);
    this.provider = props => new Provider(props);
    this.resource = props => new Resource(props);
    this.subscription = props => new Subscription(props);
    this.tag = props => new Tag(props);
    this.user = props => new User(props);
    this.webhook = props => new Webhook(props);

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

module.exports = Kvass;

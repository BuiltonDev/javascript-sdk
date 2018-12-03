const Request = require('./utils/request');
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
  constructor({
    apiKey,
    bearerToken,
    endpoint,
    singleton = false,
  } = {}) {
    if (singleton && instance) {
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

    this.request = new Request(this.endpoint, this._constructHeaders());

    this.aiModel = props => new AIModel(this.request, props);
    this.company = props => new Company(this.request, props);
    this.event = props => new Event(this.request, props);
    this.order = props => new Order(this.request, props);
    this.payment = props => new Payment(this.request, props);
    this.paymentMethod = props => new PaymentMethod(this.request, props);
    this.plan = props => new Plan(this.request, props);
    this.product = props => new Product(this.request, props);
    this.provider = props => new Provider(this.request, props);
    this.resource = props => new Resource(this.request, props);
    this.subscription = props => new Subscription(this.request, props);
    this.tag = props => new Tag(this.request, props);
    this.user = props => new User(this.request, props);
    this.webhook = props => new Webhook(this.request, props);

    if (singleton) {
      instance = this;
    }
  }

  refreshBearerToken(newBearerToken) {
    this.bearerToken = newBearerToken;
    this.request.updateHeaders(this._constructHeaders());
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

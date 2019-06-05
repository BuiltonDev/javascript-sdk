const Request = require('./utils/request');
const Error = require('./utils/error');

const AIModels = require('./collection/ressources/aiModels');
const Company = require('./collection/ressources/company');
const Events = require('./collection/ressources/events');
const Orders = require('./collection/ressources/orders');
const Payments = require('./collection/ressources/payments');
const PaymentMethods = require('./collection/ressources/paymentMethods');
const Plans = require('./collection/ressources/plans');
const Products = require('./collection/ressources/products');
const Providers = require('./collection/ressources/providers');
const Resources = require('./collection/ressources/resources');
const Subscriptions = require('./collection/ressources/subscriptions');
const Tags = require('./collection/ressources/tags');
const Users = require('./collection/ressources/users');
const Webhooks = require('./collection/ressources/webhooks');

let instance;

class Builton {
  constructor({
    apiKey,
    bearerToken,
    endpoint = 'https://qa.builton.dev/',
    singleton = false,
    refreshTokenFn = null,
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

    this.request = new Request(this.endpoint, {
      apiKey,
      bearerToken,
    }, refreshTokenFn);

    this.aiModels = new AIModels(this.request);
    this.company = new Company(this.request);
    this.events = new Events(this.request);
    this.orders = new Orders(this.request);
    this.payments = new Payments(this.request);
    this.paymentMethods = new PaymentMethods(this.request);
    this.plans = new Plans(this.request);
    this.products = new Products(this.request);
    this.providers = new Providers(this.request);
    this.resources = new Resources(this.request);
    this.subscriptions = new Subscriptions(this.request);
    this.tags = new Tags(this.request);
    this.users = new Users(this.request);
    this.webhooks = new Webhooks(this.request);

    if (singleton) {
      instance = this;
    }
  }

  refreshBearerToken(newBearerToken) {
    this.request.bearerToken = newBearerToken;
  }
}

module.exports = Builton;

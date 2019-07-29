const Request = require('./utils/request');
const Error = require('./utils/error');

const AIModels = require('./collection/resources/aiModels');
const Company = require('./collection/resources/company');
const Orders = require('./collection/resources/orders');
const Payments = require('./collection/resources/payments');
const PaymentMethods = require('./collection/resources/paymentMethods');
const Plans = require('./collection/resources/plans');
const Products = require('./collection/resources/products');
const Resources = require('./collection/resources/resources');
const Subscriptions = require('./collection/resources/subscriptions');
const Tags = require('./collection/resources/tags');
const Users = require('./collection/resources/users');
const Images = require('./collection/resources/images');

let instance;

class Builton {
  constructor({
    apiKey,
    bearerToken,
    endpoint = 'https://api.builton.dev/',
    singleton = false,
    refreshTokenFn = null,
  } = {}) {
    if (singleton && instance) {
      return instance;
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
    this.orders = new Orders(this.request);
    this.payments = new Payments(this.request);
    this.paymentMethods = new PaymentMethods(this.request);
    this.plans = new Plans(this.request);
    this.products = new Products(this.request);
    this.resources = new Resources(this.request);
    this.subscriptions = new Subscriptions(this.request);
    this.tags = new Tags(this.request);
    this.users = new Users(this.request);
    this.images = new Images(this.request);

    if (singleton) {
      instance = this;
    }
  }

  refreshBearerToken(newBearerToken) {
    this.request.bearerToken = newBearerToken;
  }
}

module.exports = Builton;

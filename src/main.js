const Request = require('./utils/request');
const Error = require('./utils/error');

const AIModel = require('./collection/single/aiModel');
const AIModels = require('./collection/list/aiModels');
const Company = require('./collection/single/company');
const Event = require('./collection/single/event');
const Events = require('./collection/list/events');
const Order = require('./collection/single/order');
const Orders = require('./collection/list/orders');
const Payment = require('./collection/single/payment');
const Payments = require('./collection/list/payments');
const PaymentMethod = require('./collection/single/paymentMethod');
const PaymentMethods = require('./collection/list/paymentMethods');
const Plan = require('./collection/single/plan');
const Plans = require('./collection/list/plans');
const Product = require('./collection/single/product');
const Products = require('./collection/list/products');
const Provider = require('./collection/single/provider');
const Providers = require('./collection/list/providers');
const Resource = require('./collection/single/resource');
const Resources = require('./collection/list/resources');
const Subscription = require('./collection/single/subscription');
const Subscriptions = require('./collection/list/subscriptions');
const Tag = require('./collection/single/tag');
const Tags = require('./collection/list/tags');
const User = require('./collection/single/user');
const Users = require('./collection/list/users');
const Webhook = require('./collection/single/webhook');
const Webhooks = require('./collection/list/webhooks');

let instance;

class Builton {
  constructor({
    apiKey,
    bearerToken,
    endpoint,
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

    this.aiModel = props => new AIModel(this.request, props);
    this.aiModels = new AIModels(this.request);
    this.company = props => new Company(this.request, props);
    this.event = props => new Event(this.request, props);
    this.events = new Events(this.request);
    this.order = props => new Order(this.request, props);
    this.orders = new Orders(this.request);
    this.payment = props => new Payment(this.request, props);
    this.payments = new Payments(this.request);
    this.paymentMethod = props => new PaymentMethod(this.request, props);
    this.paymentMethods = new PaymentMethods(this.request);
    this.plan = props => new Plan(this.request, props);
    this.plans = new Plans(this.request);
    this.product = props => new Product(this.request, props);
    this.products = new Products(this.request);
    this.provider = props => new Provider(this.request, props);
    this.providers = new Providers(this.request);
    this.resource = props => new Resource(this.request, props);
    this.resources = new Resources(this.request);
    this.subscription = props => new Subscription(this.request, props);
    this.subscriptions = new Subscriptions(this.request);
    this.tag = props => new Tag(this.request, props);
    this.tags = new Tags(this.request);
    this.user = props => new User(this.request, props);
    this.users = new Users(this.request);
    this.webhook = props => new Webhook(this.request, props);
    this.webhook = new Webhooks(this.request);

    if (singleton) {
      instance = this;
    }
  }

  refreshBearerToken(newBearerToken) {
    this.request.bearerToken = newBearerToken;
  }
}

module.exports = Builton;

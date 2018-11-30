const Components = require('./components');
const Order = require('./order');
const Subscription = require('./subscription');
const {
  del,
  get,
  getAll,
  refresh,
  update,
  search,
} = require('../utils/restFunctions');

class User extends Components {
  constructor(request, props) {
    super(request, props, [del, get, getAll, refresh, update, search]);
    this.apiPath = 'users';
    if (!this.id) {
      this.id = 'me';
    }
  }

  create({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post', apiPath: 'v2/users', urlParams, body, json,
    }, done);
  }

  login({ body, urlParams, json = false }, done) {
    return this.create({ body, urlParams, json }, done);
  }

  getOrders({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', id: this.id, resource: 'orders', urlParams, ResConstructor: Order, json,
    }, done);
  }

  getRating({ urlParams }, done) {
    return this.simpleQuery({
      type: 'get', id: this.id, resource: 'ratings', urlParams, ResConstructor: null,
    }, done);
  }

  rate({ body, urlParams }, done) {
    return this.simpleQuery({
      type: 'put', id: this.id, resource: 'ratings', body, urlParams, ResConstructor: null,
    }, done);
  }

  updateAddresses({ body, urlParams }, done) {
    return this.simpleQuery({
      type: 'put', id: this.id, resource: 'addresses', body, urlParams, ResConstructor: null,
    }, done);
  }

  getSubscriptions({ body, urlParams }, done) {
    return this.simpleQuery({
      type: 'get', id: this.id, resource: 'subscriptions', body, urlParams, ResConstructor: Subscription,
    }, done);
  }
}

module.exports = User;

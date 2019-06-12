const Component = require('./_objects');
const Order = require('./order');
const Subscription = require('./subscription');
const {
  del,
  get,
  refresh,
  update,
} = require('./_methods');

class User extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'users';
    if (!this.id) {
      this.id = 'me';
    }
  }

  getOrders({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'orders', urlParams, ResConstructor: Order, json,
    }, done);
  }

  getRating({ urlParams } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'ratings', urlParams, ResConstructor: null,
    }, done);
  }

  setRating({ body, urlParams } = {}, done) {
    return this.query({
      type: 'put', id: this.id, resource: 'ratings', body, urlParams, ResConstructor: null,
    }, done);
  }

  updateAddresses({ body, urlParams } = {}, done) {
    return this.query({
      type: 'put', id: this.id, resource: 'addresses', body, urlParams, ResConstructor: null,
    }, done);
  }

  getSubscriptions({ body, urlParams } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'subscriptions', body, urlParams, ResConstructor: Subscription,
    }, done);
  }
}

module.exports = User;

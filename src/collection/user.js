const Components = require('./components');
const Order = require('./order');

class User extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'users';
    if (!this.id) {
      this.id = 'me';
    }
  }

  // Override
  create({ body, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'post', apiPath: 'v2/users', urlParams, body, json }, done);
  }

  login({ body, urlParams, json = false }, done) {
    return this.create({ body, urlParams, json }, done);
  }

  getOrders({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'orders', urlParams, ResConstructor: Order, json }, done);
  }

  getRating({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'ratings', urlParams, ResConstructor: null }, done);
  }

  rate({ body, urlParams }, done) {
    return this.simpleQuery({ type: 'put', id: this.id, resource: 'ratings', body, urlParams, ResConstructor: null }, done);
  }

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json }, done);
  }

  updateAddresses({ body, urlParams }, done) {
    return this.simpleQuery({ type: 'put', id: this.id, resource: 'addresses', body, urlParams, ResConstructor: null }, done);
  }

}

module.exports = User;

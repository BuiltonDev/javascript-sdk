const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
  search,
} = require('../utils/restFunctions');

class Subscription extends Components {
  constructor(request, props) {
    super(request, props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'subscriptions';
  }

  start({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id, resource: 'start', body, urlParams, json,
    }, done);
  }

  stop({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id, resource: 'stop', body, urlParams, json,
    }, done);
  }
}

module.exports = Subscription;

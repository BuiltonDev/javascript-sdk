const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
} = require('../utils/restFunctions');

class Subscription extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'subscriptions';
    this.create = create.bind(this);
    this.del = del.bind(this);
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
    this.update = update.bind(this);
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

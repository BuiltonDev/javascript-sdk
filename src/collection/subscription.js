const Components = require('./components');

class Subscription extends Components {
  constructor(props) {
    super(props);
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

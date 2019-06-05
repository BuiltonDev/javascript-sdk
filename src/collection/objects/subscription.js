const Component = require('./_objects');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Subscription extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'subscriptions';
  }

  start({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', id: this.id, resource: 'start', body, urlParams, json,
    }, done);
  }

  stop({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', id: this.id, resource: 'stop', body, urlParams, json,
    }, done);
  }
}

module.exports = Subscription;

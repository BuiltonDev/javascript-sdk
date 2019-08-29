const Component = require('./_objects');
const Payment = require('./payment');
const {
  del,
  get,
  refresh,
  update,
} = require('./_methods');

class Subscription extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'subscriptions';
  }

  getPayments({ urlParams, json } = {}, done) {
    return this.query({
      type: 'get',
      resource: 'payments',
      urlParams,
      json,
      ResConstructor: Payment,
    }, done);
  }

  start(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', id: this.id, resource: 'start', body, urlParams, json,
    }, done);
  }

  stop(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', id: this.id, resource: 'stop', body, urlParams, json,
    }, done);
  }
}

module.exports = Subscription;

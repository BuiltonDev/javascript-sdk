const Component = require('./_objects');
const Subscription = require('./subscription');
const {
  get,
  refresh,
} = require('./_methods');

class Plan extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'plans';
  }

  getSubscriptions({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', resource: 'subscriptions', urlParams, json, ResConstructor: Subscription,
    }, done);
  }
}

module.exports = Plan;

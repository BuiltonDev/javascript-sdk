const Component = require('./_objects');
const Payment = require('./payment');
const Error = require('../../utils/error');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Order extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'orders';
  }

  getDeliveries({ urlParams } = {}, done) {
    return this.query({
      type: 'get',
      resource: 'deliveries',
      urlParams,
      ResConstructor: null,
    }, done);
  }

  getPayments({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get',
      resource: 'payments',
      urlParams,
      ResConstructor: Payment,
      json,
    }, done);
  }

  pay({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'pay', body, urlParams, json,
    }, done);
  }

  redeem({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'redeem', body, urlParams, json,
    }, done);
  }

  cancel({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post',
      resource: 'cancel',
      body,
      urlParams,
      json,
    }, done);
  }

  createDelivery({ body, urlParams } = {}, done) {
    return this.query({
      type: 'post',
      resource: 'deliveries',
      body,
      urlParams,
      ResConstructor: null,
    }, done);
  }

  triggerDeliveryAction({ body, deliveryId, urlParams } = {}, done) {
    if (!this.id) return done(new Error.MethodNeedsId());
    if (!deliveryId) return done(new Error.MethodNeedsArg('deliveryId'));
    const params = {
      type: 'post',
      fullPath: `${this.apiPath}/${this.id}/deliveries/${deliveryId}`,
      body,
      urlParams,
      ResConstructor: null,
    };
    return this.query(params, done);
  }
}

module.exports = Order;

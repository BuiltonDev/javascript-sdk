const Components = require('./components');
const Error = require('../utils/error');

class Order extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'orders';
  }

  getDeliveries({ urlParams }, done) {
    return this.simpleQuery({
      type: 'get',
      id: this.id,
      resource: 'deliveries',
      urlParams,
      ResConstructor: null,
    }, done);
  }

  pay({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id, resource: 'pay', body, urlParams, json,
    }, done);
  }

  cancel({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post',
      id: this.id,
      resource: 'cancel',
      body,
      urlParams,
      json,
    }, done);
  }

  createDelivery({ body, urlParams }, done) {
    return this.simpleQuery({
      type: 'post',
      id: this.id,
      resource: 'deliveries',
      body,
      urlParams,
      ResConstructor: null,
    }, done);
  }

  triggerDeliveryAction({ body, deliveryId, urlParams }, done) {
    if (!this.id) return done(new Error.MethodNeedsId());
    if (!deliveryId) return done(new Error.MethodNeedsArg('deliveryId'));
    const params = {
      type: 'post',
      resource: `${this.apiPath}/${this.id}/deliveries/${deliveryId}`,
      id: this.id,
      body,
      urlParams,
      ResConstructor: null,
    };
    return this.buildQuery(params, done);
  }
}

module.exports = Order;

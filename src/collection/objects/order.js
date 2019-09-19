const Component = require('./_objects');
const Payment = require('./payment');
const {
  get,
  refresh,
  update,
} = require('./_methods');

class Order extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh, update]);
    this.apiPath = 'orders';
  }

  getPayments({
    page, size, urlParams, json = false,
  } = {}, done) {
    return this.paginate({
      page,
      size,
      type: 'get',
      resource: 'payments',
      urlParams,
      ResConstructor: Payment,
      json,
    }, done);
  }

  pay(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'pay', body, urlParams, json,
    }, done);
  }

  cancel(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post',
      resource: 'cancel',
      body,
      urlParams,
      json,
    }, done);
  }
}

module.exports = Order;

const Component = require('./_objects');
const {
  get,
  refresh,
} = require('./_methods');

class Payment extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'payments';
  }

  pay(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'pay', body, urlParams, json,
    }, done);
  }

  // Confirm the payment due to SCA triggered
  confirm(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'confirm', body, urlParams, json,
    }, done);
  }
}

module.exports = Payment;

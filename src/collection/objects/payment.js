const Component = require('./_objects');
const {
  get,
  refresh,
  update,
} = require('./_util');

class Payment extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh, update]);
    this.apiPath = 'payments';
  }

  pay({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'pay', body, urlParams, json,
    }, done);
  }
}

module.exports = Payment;

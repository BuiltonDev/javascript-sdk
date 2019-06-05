const Component = require('./_component');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class PaymentMethod extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'payment_methods';
  }
}

module.exports = PaymentMethod;

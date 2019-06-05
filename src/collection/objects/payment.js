const Component = require('./_objects');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Payment extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'payments';
  }
}

module.exports = Payment;

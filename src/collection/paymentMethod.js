const Components = require('./components');

class PaymentMethod extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'payment_methods';
  }
}

module.exports = PaymentMethod;

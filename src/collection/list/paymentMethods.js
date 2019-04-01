const Components = require('./_components');
const PaymentMethod = require('../single/paymentMethod');
const {
  create,
  get,
} = require('./_utils');

class PaymentMethods extends Components {
  constructor(request) {
    super(request, [create, get]);
    this.apiPath = 'payment_methods';
    this.ResConstructor = PaymentMethod;
  }
}

module.exports = PaymentMethods;

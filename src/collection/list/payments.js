const Components = require('./_components');
const Payment = require('../single/payment');
const {
  create,
  get,
  search,
} = require('./_utils');

class Payments extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'payments';
    this.ResConstructor = Payment;
  }
}

module.exports = Payments;

const Components = require('./_resources');
const PaymentMethod = require('../objects/paymentMethod');
const {
  create,
  del,
  update,
  getFromId,
  getAll,
  get,
  set,
} = require('./_methods')(PaymentMethod);

class PaymentMethods extends Components {
  constructor(request) {
    super([create, del, update, getFromId, getAll, get, set]);
    this.request = request;
    this.apiPath = 'payment_methods';
    this.ResConstructor = PaymentMethod;
  }
}

module.exports = PaymentMethods;

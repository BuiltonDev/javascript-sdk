const Components = require('./_components');
const PaymentMethod = require('../objects/paymentMethod');
const {
  create,
  del,
  update,
  getFromId,
  get,
  set,
  setOne,
} = require('./_utils')(PaymentMethod);

class PaymentMethods extends Components {
  constructor(request) {
    super([create, del, update, getFromId, get, set, setOne]);
    this.request = request;
    this.apiPath = 'payment_methods';
    this.ResConstructor = PaymentMethod;
    this.buildIdMethods();
  }
}

module.exports = PaymentMethods;

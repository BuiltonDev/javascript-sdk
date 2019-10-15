const Components = require('./_resources');
const Payment = require('../objects/payment');
const {
  create,
  getFromId,
  getAll,
  get,
  set,
  search,
} = require('./_methods')(Payment);

class Payments extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, set, search]);
    this.request = request;
    this.apiPath = 'payments';
    this.ResConstructor = Payment;
  }

  pay(id, ...params) {
    const obj = new Payment(this.request, id);
    return obj.pay(...params);
  }
  
  // Confirm the payment due to SCA triggered
  confirm(id, ...params) {
    const obj = new Payment(this.request, id);
    return obj.confirm(...params);
  }
}

module.exports = Payments;

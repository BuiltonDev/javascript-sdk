const Components = require('./_components');
const Payment = require('../objects/payment');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Payment);

class Payments extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'payments';
    this.ResConstructor = Payment;
    this.buildIdMethods();
  }
}

module.exports = Payments;

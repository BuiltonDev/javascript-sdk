const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
} = require('../utils/restFunctions');

class PaymentMethod extends Components {
  constructor(request, props) {
    super(request, props, [create, del, get, getAll, refresh, update]);
    this.apiPath = 'payment_methods';
  }
}

module.exports = PaymentMethod;

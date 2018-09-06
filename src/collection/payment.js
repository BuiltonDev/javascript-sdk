const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
  search,
} = require('../utils/restFunctions');

class Payment extends Components {
  constructor(props) {
    super(props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'payments';
  }
}

module.exports = Payment;

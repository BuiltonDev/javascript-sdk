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
  constructor(props) {
    super(props);
    this.apiPath = 'payment_methods';
    this.create = create.bind(this);
    this.del = del.bind(this);
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
    this.update = update.bind(this);
  }
}

module.exports = PaymentMethod;

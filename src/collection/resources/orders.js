const Components = require('./_resources');
const Order = require('../objects/order');
const {
  getFromId,
  getAll,
  get,
  create,
  update,
  set,
} = require('./_methods')(Order);

class Orders extends Components {
  constructor(request) {
    super([getFromId, getAll, get, create, update, set]);
    this.request = request;
    this.apiPath = 'orders';
    this.ResConstructor = Order;
  }

  getPayments(id, ...params) {
    const obj = new Order(this.request, id);
    return obj.getPayments(...params);
  }

  pay(id, ...params) {
    const obj = new Order(this.request, id);
    return obj.pay(...params);
  }

  cancel(id, ...params) {
    const obj = new Order(this.request, id);
    return obj.cancel(...params);
  }
}

module.exports = Orders;

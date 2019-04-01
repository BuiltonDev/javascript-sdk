const Components = require('../list/_components');
const Order = require('../single/order');
const {
  get,
  create,
  search,
} = require('./_utils');

class Orders extends Components {
  constructor(request) {
    super(request, [get, create, search]);
    this.apiPath = 'orders';
    this.ResConstructor = Order;
  }
}

module.exports = Orders;

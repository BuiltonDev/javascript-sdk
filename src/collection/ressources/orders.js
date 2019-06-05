const Components = require('./_components');
const Order = require('../objects/order');
const {
  getFromId,
  get,
  create,
  search,
  set,
  setOne,
} = require('./_utils')(Order);

class Orders extends Components {
  constructor(request) {
    super([getFromId, get, create, search, set, setOne]);
    this.request = request;
    this.apiPath = 'orders';
    this.ResConstructor = Order;
    this.buildIdMethods();
  }
}

module.exports = Orders;

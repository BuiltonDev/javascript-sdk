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

class Product extends Components {
  constructor(request, props) {
    super(request, props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'products';
  }
}

module.exports = Product;

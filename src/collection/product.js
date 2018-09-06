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
  constructor(props) {
    super(props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'products';
  }
}

module.exports = Product;

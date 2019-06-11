const Components = require('./_resources');
const Product = require('../objects/product');
const {
  getFromId,
  getAll,
  get,
  search,
  set,
} = require('./_methods')(Product);

class Products extends Components {
  constructor(request) {
    super([getFromId, getAll, get, search, set]);
    this.request = request;
    this.apiPath = 'products';
    this.ResConstructor = Product;
  }
}

module.exports = Products;

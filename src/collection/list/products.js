const Components = require('./_components');
const Product = require('../single/product');
const {
  create,
  get,
  search,
} = require('./_utils');

class Products extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'products';
    this.ResConstructor = Product;
  }
}

module.exports = Products;

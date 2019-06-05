const Components = require('./_components');
const Product = require('../objects/product');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Product);

class Products extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'products';
    this.ResConstructor = Product;
    this.buildIdMethods();
  }
}

module.exports = Products;

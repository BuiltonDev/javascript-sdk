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

  getSubProducts(id, ...params) {
    const obj = new Product(this.request, id);
    return obj.getSubProducts(...params);
  }

  searchSubProducts(id, ...params) {
    const obj = new Product(this.request, id);
    return obj.searchSubProducts(...params);
  }
}

module.exports = Products;

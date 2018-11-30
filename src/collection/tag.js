const Components = require('./components');
const Product = require('./product');
const Provider = require('./provider');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
  search,
} = require('../utils/restFunctions');

class Tag extends Components {
  constructor(request, props) {
    super(request, props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'tags';
  }

  getProducts({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', id: this.id, resource: 'products', urlParams, json, ResConstructor: Product,
    }, done);
  }

  getProviders({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', id: this.id, resource: 'providers', urlParams, json, ResConstructor: Provider,
    }, done);
  }
}

module.exports = Tag;

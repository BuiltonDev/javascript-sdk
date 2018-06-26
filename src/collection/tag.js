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
} = require('../utils/restFunctions');

class Tag extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'tags';
    this.create = create.bind(this);
    this.del = del.bind(this);
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
    this.update = update.bind(this);
  }

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
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

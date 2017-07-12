const Components = require('./components');
const Product = require('./product');
const Provider = require('./provider');

class Tag extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'tags';
  }

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json }, done);
  }

  getProducts({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'products', urlParams, json, ResConstructor: Product }, done);
  }

  getProviders({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'providers', urlParams, json, ResConstructor: Provider }, done);
  }
}

module.exports = Tag;

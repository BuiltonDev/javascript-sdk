const Components = require('./components');

class Product extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'products';
  }

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json }, done);
  }
}

module.exports = Product;

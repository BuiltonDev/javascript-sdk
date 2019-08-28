const Component = require('./_objects');
const {
  get,
  refresh,
} = require('./_methods');

class Product extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'products';
  }

  getSubProducts({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', resource: 'sub_products', urlParams, json,
    }, done);
  }

  searchSubProducts(query, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', resource: 'sub_products/search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  }
}

module.exports = Product;

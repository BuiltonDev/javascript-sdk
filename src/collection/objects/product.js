const Component = require('./_objects');
const {
  get,
  refresh,
} = require('./_util');

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

  searchSubProducts({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', resource: 'sub_products/search', urlParams, json,
    }, done);
  }
}

module.exports = Product;

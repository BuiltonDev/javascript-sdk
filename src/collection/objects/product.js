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

  getSubProducts({
    size, page, urlParams, json = false,
  } = {}, done) {
    return this.paginate({
      size, page, type: 'get', resource: 'sub_products', urlParams, json,
    }, done);
  }

  searchSubProducts({
    size, page, query, urlParams, json = false,
  } = {}, done) {
    return this.paginate({
      size, page, type: 'get', resource: 'sub_products/search', urlParams: { ...urlParams, query }, json,
    }, done);
  }
}

module.exports = Product;

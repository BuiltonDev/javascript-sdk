const Component = require('./_component');
const {
  create,
  del,
  get,
  refresh,
  update,
  search,
} = require('./_util');

class Product extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'products';
  }
}

module.exports = Product;

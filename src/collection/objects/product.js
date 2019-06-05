const Component = require('./_objects');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Product extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'products';
  }
}

module.exports = Product;

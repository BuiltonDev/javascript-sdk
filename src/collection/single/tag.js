const Component = require('./_component');
const Product = require('./product');
const Provider = require('./provider');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Tag extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'tags';
  }

  getProducts({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'products', urlParams, json, ResConstructor: Product,
    }, done);
  }

  getProviders({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'providers', urlParams, json, ResConstructor: Provider,
    }, done);
  }
}

module.exports = Tag;

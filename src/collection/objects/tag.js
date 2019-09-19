const Component = require('./_objects');
const Product = require('./product');
const Resource = require('./payment');
const {
  get,
  refresh,
} = require('./_methods');

class Tag extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'tags';
  }

  getProducts({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'products', urlParams, json, ResConstructor: Product,
    }, done);
  }

  getResources({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'resources', urlParams, json, ResConstructor: Resource,
    }, done);
  }
}

module.exports = Tag;

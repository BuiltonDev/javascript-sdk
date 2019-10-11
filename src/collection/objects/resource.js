const Component = require('./_objects');
const Order = require('./order');
const {
  del,
  get,
  refresh,
  update,
} = require('./_methods');

class Resource extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'resources';
  }

  getOrders({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get',
      resource: 'orders',
      urlParams,
      json,
      ResConstructor: Order,
    }, done);
  }
}

module.exports = Resource;

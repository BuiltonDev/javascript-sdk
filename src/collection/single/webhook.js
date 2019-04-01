const Component = require('./_component');
const {
  create,
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Webhook extends Component {
  constructor(request, props) {
    super(request, props, [create, del, get, refresh, update]);
    this.apiPath = 'webhooks';
  }
}

module.exports = Webhook;

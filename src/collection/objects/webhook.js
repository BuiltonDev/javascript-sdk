const Component = require('./_component');
const {
  del,
  get,
  refresh,
  update,
} = require('./_util');

class Webhook extends Component {
  constructor(request, props) {
    super(request, props, [del, get, refresh, update]);
    this.apiPath = 'webhooks';
  }
}

module.exports = Webhook;

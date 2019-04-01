const Component = require('./_components');
const Webhook = require('../single/webhook');
const {
  create,
  get,
} = require('./_utils');

class Webhooks extends Component {
  constructor(request) {
    super(request, [create, get]);
    this.apiPath = 'webhooks';
    this.ResConstructor = Webhook;
  }
}

module.exports = Webhooks;

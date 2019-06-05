const Component = require('./_components');
const Webhook = require('../objects/webhook');
const {
  create,
  getFromId,
  get,
  set,
  setOne,
} = require('./_utils')(Webhook);

class Webhooks extends Component {
  constructor(request) {
    super([create, getFromId, get, set, setOne]);
    this.request = request;
    this.apiPath = 'webhooks';
    this.ResConstructor = Webhook;
    this.buildIdMethods();
  }
}

module.exports = Webhooks;

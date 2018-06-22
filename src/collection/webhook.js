const Components = require('./components');

class Webhook extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'webhooks';
  }
}

module.exports = Webhook;

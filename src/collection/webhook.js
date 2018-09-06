const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
} = require('../utils/restFunctions');

class Webhook extends Components {
  constructor(props) {
    super(props, [create, del, get, getAll, refresh, update]);
    this.apiPath = 'webhooks';
  }
}

module.exports = Webhook;

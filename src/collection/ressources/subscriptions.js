const Components = require('./_components');
const Subscription = require('../objects/subscription');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Subscription);

class Subscriptions extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'subscriptions';
    this.ResConstructor = Subscription;
    this.buildIdMethods();
  }
}

module.exports = Subscriptions;

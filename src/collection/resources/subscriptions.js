const Components = require('./_resources');
const Subscription = require('../objects/subscription');
const {
  create,
  getFromId,
  getAll,
  get,
  set,
  setOne,
} = require('./_utils')(Subscription);

class Subscriptions extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, set, setOne]);
    this.request = request;
    this.apiPath = 'subscriptions';
    this.ResConstructor = Subscription;
  }

  getPayments(id, ...params) {
    const obj = new Subscription(this.request, id);
    return obj.getPayments(...params);
  }

  start(id, ...params) {
    const obj = new Subscription(this.request, id);
    return obj.start(...params);
  }

  stop(id, ...params) {
    const obj = new Subscription(this.request, id);
    return obj.stop(...params);
  }
}

module.exports = Subscriptions;

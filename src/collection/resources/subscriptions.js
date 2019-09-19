const Components = require('./_resources');
const Subscription = require('../objects/subscription');
const {
  getFromId,
  getAll,
  get,
  set,
  update,
} = require('./_methods')(Subscription);

class Subscriptions extends Components {
  constructor(request) {
    super([getFromId, getAll, get, set, update]);
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

const Components = require('./_components');
const Subscription = require('../single/subscription');
const {
  create,
  get,
  search,
} = require('./_utils');

class Subscriptions extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'subscriptions';
    this.ResConstructor = Subscription;
  }
}

module.exports = Subscriptions;

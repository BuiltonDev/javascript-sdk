const Components = require('./_components');
const Plan = require('../single/plan');
const {
  create,
  get,
  search,
} = require('./_utils');

class Plans extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'plans';
    this.ResConstructor = Plan;
  }
}

module.exports = Plans;

const Components = require('./_components');
const Plan = require('../objects/plan');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Plan);

class Plans extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'plans';
    this.ResConstructor = Plan;
    this.buildIdMethods();
  }
}

module.exports = Plans;

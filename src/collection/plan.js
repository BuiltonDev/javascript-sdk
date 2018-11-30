const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
  search,
} = require('../utils/restFunctions');

class Plan extends Components {
  constructor(request, props) {
    super(request, props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'plans';
  }
}

module.exports = Plan;

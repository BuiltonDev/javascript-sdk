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

class Resource extends Components {
  constructor(props) {
    super(props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'resources';
  }

  createBulk({ body, urlParams, json }, done) {
    return this.simpleQuery({
      type: 'post', resource: 'bulk', urlParams: Object.assign({}, urlParams), body, json,
    }, done);
  }
}

module.exports = Resource;

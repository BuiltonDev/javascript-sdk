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
  constructor(request, props) {
    super(request, props, [create, del, get, getAll, refresh, update, search]);
    this.apiPath = 'resources';
  }

  createBulk({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post', resource: 'bulk', urlParams, body, json,
    }, done);
  }
}

module.exports = Resource;

const Components = require('./_resources');
const Resource = require('../objects/resource');
const {
  create,
  getFromId,
  getAll,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Resource);

class Resources extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'resources';
    this.ResConstructor = Resource;
  }

  createBulk({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'bulk', urlParams, body, json,
    }, done);
  }

  updateBulk({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'put', resource: 'bulk', urlParams, body, json,
    }, done);
  }
}

module.exports = Resources;

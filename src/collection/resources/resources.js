const Components = require('./_resources');
const Resource = require('../objects/resource');
const {
  create,
  getFromId,
  getAll,
  get,
  search,
  set,
  del,
  update,
} = require('./_methods')(Resource);

class Resources extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, search, set, del, update]);
    this.request = request;
    this.apiPath = 'resources';
    this.ResConstructor = Resource;
  }

  createBulk(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'bulk', urlParams, body, json,
    }, done);
  }

  updateBulk(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'put', resource: 'bulk', urlParams, body, json,
    }, done);
  }

  getOrders(id, ...params) {
    const obj = new Resource(this.request, id);
    return obj.getOrders(...params);
  }
}

module.exports = Resources;

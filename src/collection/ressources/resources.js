const Components = require('./_components');
const Resource = require('../objects/resource');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Resource);

class Resources extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'resources';
    this.ResConstructor = Resource;
    this.buildIdMethods();
  }

  createBulk({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'bulk', urlParams, body, json,
    }, done);
  }
}

module.exports = Resources;

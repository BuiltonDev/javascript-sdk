const Components = require('./_components');
const Resource = require('../single/resource');
const {
  create,
  get,
  search,
} = require('./_utils');

class Resources extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'resources';
    this.ResConstructor = Resource;
  }

  createBulk({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', resource: 'bulk', urlParams, body, json,
    }, done);
  }
}

module.exports = Resources;

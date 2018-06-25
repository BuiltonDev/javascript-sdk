const Components = require('./components');
const {
  get,
  refresh,
  getAll,
  create,
  del,
  update,
} = require('../utils/restFunctions');

class Resource extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'resources';
    this.create = create.bind(this);
    this.del = del.bind(this);
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
    this.update = update.bind(this);
  }

  createBulk({ body, urlParams, json }, done) {
    return this.simpleQuery({
      type: 'post', resource: 'bulk', urlParams: Object.assign({}, urlParams), body, json,
    }, done);
  }
}

module.exports = Resource;

const Components = require('./components');

class Resource extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'resources';
  }

  createBulk({ body, urlParams, json }, done) {
    return this.simpleQuery({
      type: 'post', resource: 'bulk', urlParams: Object.assign({}, urlParams), body, json,
    }, done);
  }
}

module.exports = Resource;

const Components = require('./components');
const {
  getAll,
  refresh,
} = require('../utils/restFunctions');

class Company extends Components {
  constructor(props) {
    super(props, [getAll, refresh]);
    this.apiPath = 'companies';
  }

  getProperties({ urlParams }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'properties', urlParams, ResConstructor: null,
    }, done);
  }

  get({ urlParams, json = false }, done) {
    return this.getAll({ urlParams, json }, done);
  }
}

module.exports = Company;

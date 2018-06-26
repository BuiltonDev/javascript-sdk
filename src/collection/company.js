const Components = require('./components');
const {
  getAll,
  refresh,
} = require('../utils/restFunctions');

class Company extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'companies';
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
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

const Users = require('./users');
const Provider = require('../objects/provider');
const {
  set,
  setOne,
  getFromId,
  get,
} = require('./_utils')(Provider);

class Providers extends Users {
  constructor(request) {
    super([set, setOne, getFromId, get]);
    this.request = request;
    this.apiPath = 'providers';
    this.ResConstructor = Provider;
    this.buildIdMethods();
  }

  // Override
  create({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', apiPath: 'v2/providers', urlParams, body, json,
    }, done);
  }

  find({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', action: 'find', urlParams, json,
    }, done);
  }

  getAvailableCount({ urlParams } = {}, done) {
    return this.query({
      type: 'get', action: 'available-count', urlParams, ResConstructor: null,
    }, done);
  }

  getReports({ urlParams } = {}, done) {
    return this.query({
      type: 'get', action: 'reports-count', urlParams, ResConstructor: null,
    }, done);
  }

  getAvailableOverview({ urlParams } = {}, done) {
    return this.query({
      type: 'get', action: 'available-overview', urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = Providers;

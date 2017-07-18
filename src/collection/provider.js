/* eslint class-methods-use-this: ["error", { "exceptMethods": ["updateAddresses"] }] */

const User = require('./user');
const Error = require('../utils/error');

class Provider extends User {
  constructor(props) {
    super(props);
    this.apiPath = 'providers';
  }

  // Override
  create({ body, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'post', apiPath: 'v2/providers', urlParams, body, json }, done);
  }

  find({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', resource: 'find', urlParams, json }, done);
  }

  getAvailableCount({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', resource: 'available-count', urlParams, ResConstructor: null }, done);
  }

  getAllReports({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', resource: 'reports-count', urlParams, ResConstructor: null }, done);
  }

  getReports({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'reports-count', urlParams, ResConstructor: null }, done);
  }

  getAvailableOverview({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'available-overview', urlParams, ResConstructor: null }, done);
  }

  getSchedule({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'schedule', urlParams, ResConstructor: null }, done);
  }

  getAvailability({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'availability', urlParams, ResConstructor: null }, done);
  }

  getAvailableAt({ urlParams }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'available-at', urlParams, ResConstructor: null }, done);
  }

  getProducts({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, resource: 'products', urlParams, json }, done);
  }

  postProducts({ body, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'post', id: this.id, resource: 'products', body, urlParams, json }, done);
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  updateAddresses({ body, urlParams }, done) {
    return done(new Error.NotImplemented());
  }
}

module.exports = Provider;

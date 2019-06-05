const User = require('./user');
const Error = require('../../utils/error');

class Provider extends User {
  constructor(request, props) {
    super(request, props);
    this.apiPath = 'providers';
  }

  getReports({ urlParams } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'reports-count', urlParams, ResConstructor: null,
    }, done);
  }

  getSchedule({ urlParams } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'schedule', urlParams, ResConstructor: null,
    }, done);
  }

  getAvailability({ urlParams } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'availability', urlParams, ResConstructor: null,
    }, done);
  }

  getAvailableAt({ urlParams } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'available-at', urlParams, ResConstructor: null,
    }, done);
  }

  getProducts({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', id: this.id, resource: 'products', urlParams, json,
    }, done);
  }

  postProducts({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', id: this.id, resource: 'products', body, urlParams, json,
    }, done);
  }

  // Override
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  updateAddresses({ body, urlParams } = {}, done) {
    return done(new Error.NotImplemented());
  }
}

module.exports = Provider;

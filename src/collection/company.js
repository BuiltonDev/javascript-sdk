/* eslint class-methods-use-this:
["error",{ "exceptMethods": ["create", "update", "del"] }] */

const Components = require('./components');
const Error = require('../utils/error');

class Company extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'companies';
  }

  getProperties({ urlParams }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'properties', urlParams, ResConstructor: null,
    }, done);
  }

  // Override
  get({ urlParams, json = false }, done) {
    return this.getAll({ urlParams, json }, done);
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  create({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  update({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  del({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }
}

module.exports = Company;

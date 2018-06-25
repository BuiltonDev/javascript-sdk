const Components = require('./components');

class Event extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'events';
  }

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  }

  // Override
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  create({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  // Override
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  update({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  // Override
  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  del({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }
}

module.exports = Event;

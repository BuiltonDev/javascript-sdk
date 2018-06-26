const Components = require('./components');
const {
  get,
  getAll,
  refresh,
} = require('../utils/restFunctions');

class Event extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'events';
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
  }

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  }
}

module.exports = Event;

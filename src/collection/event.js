const Components = require('./components');
const {
  get,
  getAll,
  refresh,
  search,
} = require('../utils/restFunctions');

class Event extends Components {
  constructor(props) {
    super(props, [get, getAll, refresh, search]);
    this.apiPath = 'events';
  }
}

module.exports = Event;

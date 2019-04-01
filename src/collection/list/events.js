const Components = require('./_components');
const Event = require('../single/event');
const {
  get,
  search,
} = require('./_utils');

class Events extends Components {
  constructor(request) {
    super(request, [get, search]);
    this.apiPath = 'events';
    this.ResConstructor = Event;
  }
}

module.exports = Events;

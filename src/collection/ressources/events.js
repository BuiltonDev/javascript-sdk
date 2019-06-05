const Components = require('./_components');
const Event = require('../objects/event');
const {
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Event);

class Events extends Components {
  constructor(request) {
    super([getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'events';
    this.ResConstructor = Event;
    this.buildIdMethods();
  }
}

module.exports = Events;

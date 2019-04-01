const Component = require('./_component');
const {
  get,
  refresh,
} = require('./_util');

class Event extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'events';
  }
}

module.exports = Event;

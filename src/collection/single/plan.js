const Component = require('./_component');
const {
  create,
  del,
  get,
  refresh,
  update,
  search,
} = require('./_util');

class Plan extends Component {
  constructor(request, props) {
    super(request, props, [create, del, get, refresh, update, search]);
    this.apiPath = 'plans';
  }
}

module.exports = Plan;

const Components = require('./components');
const {
  create,
  del,
  get,
  getAll,
  refresh,
  update,
} = require('../utils/restFunctions');

class Payment extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'payments';
    this.create = create.bind(this);
    this.del = del.bind(this);
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
    this.refresh = refresh.bind(this);
    this.update = update.bind(this);
  }

  search({ query, urlParams, json }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  }
}

module.exports = Payment;

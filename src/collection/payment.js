const Components = require('./components');

class Payment extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'payments';
  }

  search({ query, urlParams, json }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  }
}

module.exports = Payment;

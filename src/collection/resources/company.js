const Component = require('./_resources');

class Company extends Component {
  constructor(request) {
    super();
    this.request = request;
    this.apiPath = 'companies';
  }

  getProperties({ urlParams } = {}, done) {
    return this.query({
      type: 'get', action: 'properties', urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = Company;

const Component = require('./_component');
const {
  refresh,
} = require('./_util');

class Company extends Component {
  constructor(request, props) {
    super(request, props, [refresh]);
    this.apiPath = 'companies';
  }

  getProperties({ urlParams } = {}, done) {
    return this.query({
      type: 'get', fullPath: `${this.apiPath}/properties`, urlParams, ResConstructor: null,
    }, done);
  }

  get({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', fullPath: this.apiPath, urlParams, json,
    }, done);
  }
}

module.exports = Company;

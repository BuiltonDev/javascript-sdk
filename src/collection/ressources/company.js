const Component = require('./_components');
const {
  getFromId,
  get,
} = require('./_utils')();

class Company extends Component {
  constructor(request) {
    super([getFromId, get]);
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

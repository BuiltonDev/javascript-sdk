const Component = require('./_component');
const {
  get,
} = require('./_util');

class AIModel extends Component {
  constructor(request, props) {
    super(request, props, [get]);
    this.apiPath = 'ai/models';
  }

  train({ urlParam, json = false } = {}, done) {
    return this.query({
      type: 'post', urlParam, resource: 'train', json,
    }, done);
  }

  getRecommendations({ body, urlParams } = {}, done) {
    return this.query({
      type: 'post', resource: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = AIModel;

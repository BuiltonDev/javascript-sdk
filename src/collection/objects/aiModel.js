const Component = require('./_objects');
const {
  get,
} = require('./_methods');

class AIModel extends Component {
  constructor(request, props) {
    super(request, props, [get]);
    this.apiPath = 'ai/models';
  }

  getRecommendations({ body, urlParams } = {}, done) {
    return this.query({
      type: 'post', resource: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = AIModel;

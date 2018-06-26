const Components = require('./components');
const {
  create,
  get,
  getAll,
} = require('../utils/restFunctions');

class AIModel extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'ai/models';
    this.create = create.bind(this);
    this.get = get.bind(this);
    this.getAll = getAll.bind(this);
  }

  train({ urlParam, json = false }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id, urlParam, resource: 'train', json,
    }, done);
  }

  getRecommendations({ body, urlParams }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id || '', resource: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = AIModel;

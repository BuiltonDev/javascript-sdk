const Components = require('./components');
const {
  create,
  get,
  getAll,
  search,
} = require('../utils/restFunctions');

class AIModel extends Components {
  constructor(props) {
    super(props, [create, get, getAll, search]);
    this.apiPath = 'ai/models';
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

const Components = require('./_components');
const aiModel = require('../single/aiModel');
const {
  create,
  get,
  search,
} = require('./_utils');

class AIModels extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'ai/models';
    this.ResConstructor = aiModel;
  }

  getRecommendations({ body, urlParams } = {}, done) {
    return this.query({
      type: 'post', action: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = AIModels;

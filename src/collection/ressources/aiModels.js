const Components = require('./_components');
const aiModel = require('../objects/aiModel');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(aiModel);

class AIModels extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'ai/models';
    this.ResConstructor = aiModel;
    this.buildIdMethods();
  }

  getRecommendations({ body, urlParams } = {}, done) {
    return this.query({
      type: 'post', action: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = AIModels;

const Components = require('./_resources');
const AiModel = require('../objects/aiModel');
const {
  create,
  getFromId,
  getAll,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(AiModel);

class AIModels extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'ai/models';
    this.ResConstructor = AiModel;
  }

  getRecommendations(id, ...params) {
    const obj = new AiModel(this.request, id);
    return obj.getRecommendations(...params);
  }
}

module.exports = AIModels;

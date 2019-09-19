const Components = require('./_resources');
const AiModel = require('../objects/aiModel');
const {
  getFromId,
  getAll,
  get,
  set,
} = require('./_methods')(AiModel);

class AIModels extends Components {
  constructor(request) {
    super([getFromId, getAll, get, set]);
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

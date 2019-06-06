const Components = require('./_resources');
const Tag = require('../objects/tag');
const {
  create,
  getFromId,
  getAll,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Tag);

class Tags extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'tags';
    this.ResConstructor = Tag;
  }

  getProducts(id, ...params) {
    const obj = new Tag(this.request, id);
    return obj.getProducts(...params);
  }

  getRessources(id, ...params) {
    const obj = new Tag(this.request, id);
    return obj.getRessources(...params);
  }
}

module.exports = Tags;

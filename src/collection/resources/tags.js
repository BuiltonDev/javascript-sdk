const Components = require('./_resources');
const Tag = require('../objects/tag');
const {
  getFromId,
  getAll,
  get,
  search,
  set,
} = require('./_methods')(Tag);

class Tags extends Components {
  constructor(request) {
    super([getFromId, getAll, get, search, set]);
    this.request = request;
    this.apiPath = 'tags';
    this.ResConstructor = Tag;
  }

  getProducts(id, ...params) {
    const obj = new Tag(this.request, id);
    return obj.getProducts(...params);
  }

  getResources(id, ...params) {
    const obj = new Tag(this.request, id);
    return obj.getResources(...params);
  }
}

module.exports = Tags;

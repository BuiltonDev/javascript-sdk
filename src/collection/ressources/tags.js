const Components = require('./_components');
const Tag = require('../objects/tag');
const {
  create,
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(Tag);

class Tags extends Components {
  constructor(request) {
    super([create, getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'tags';
    this.ResConstructor = Tag;
    this.buildIdMethods();
  }
}

module.exports = Tags;

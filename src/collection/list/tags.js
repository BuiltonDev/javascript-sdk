const Components = require('./_components');
const Tag = require('../single/tag');
const {
  create,
  get,
  search,
} = require('./_utils');

class Tags extends Components {
  constructor(request) {
    super(request, [create, get, search]);
    this.apiPath = 'tags';
    this.ResConstructor = Tag;
  }
}

module.exports = Tags;

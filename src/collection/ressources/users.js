const Components = require('./_components');
const User = require('../objects/user');
const {
  getFromId,
  get,
  search,
  set,
  setOne,
} = require('./_utils')(User);

class Users extends Components {
  constructor(request) {
    super([getFromId, get, search, set, setOne]);
    this.request = request;
    this.apiPath = 'users';
    this.ResConstructor = User;
    this.setMe = () => new User(request);
    this.buildIdMethods();
  }

  create({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', apiPath: 'v2/users', urlParams, body, json,
    }, done);
  }

  authenticate({ body, urlParams, json = false } = {}, done) {
    return this.create({ body, urlParams, json }, done);
  }
}

module.exports = Users;

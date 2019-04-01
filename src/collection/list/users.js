const Components = require('./_components');
const User = require('../single/user');
const {
  get,
  search,
} = require('./_utils');

class Users extends Components {
  constructor(request) {
    super(request, [get, search]);
    this.apiPath = 'users';
    this.ResConstructor = User;
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

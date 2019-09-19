const Components = require('./_resources');
const User = require('../objects/user');
const {
  getFromId,
  get,
  set,
  del,
  update,
} = require('./_methods')(User);

class Users extends Components {
  constructor(request) {
    super([getFromId, get, set, del, update]);
    this.request = request;
    this.apiPath = 'users';
    this.ResConstructor = User;
    this.setMe = () => new User(request);
  }

  // The `Create` and the `Authenticate` functions are functionnaly identical.
  // No need to `Authenticate` after `Create`.
  create(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post', apiPath: 'v2/users', urlParams, body, json,
    }, done);
  }

  authenticate(body, { urlParams, json = false } = {}, done) {
    return this.create(body, { urlParams, json }, done);
  }

  getOrders(id, ...params) {
    const obj = new User(this.request, id);
    return obj.getOrders(...params);
  }

  getRating(id, ...params) {
    const obj = new User(this.request, id);
    return obj.getRating(...params);
  }

  setRating(id, ...params) {
    const obj = new User(this.request, id);
    return obj.setRating(...params);
  }

  updateAddresses(id, ...params) {
    const obj = new User(this.request, id);
    return obj.updateAddresses(...params);
  }

  getSubscriptions(id, ...params) {
    const obj = new User(this.request, id);
    return obj.getSubscriptions(...params);
  }
}

module.exports = Users;

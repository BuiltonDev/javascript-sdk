module.exports = {
  getAll({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', urlParams, json }, done);
  },

  get({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get',
      id: this.id,
      urlParams,
      json,
    }, done);
  },

  refresh({ urlParams, json = false }, done) {
    return this.get({ urlParams, json }, done);
  },

  update({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'put',
      id: this.id,
      urlParams,
      body,
      json,
    }, done);
  },

  del({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'del',
      id: this.id,
      urlParams,
      json,
    }, done);
  },

  create({ body, urlParams, json = false }, done) {
    this.simpleQuery({
      type: 'post',
      urlParams,
      body,
      json,
    }, done);
  },

  search({ query, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', resource: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  },
};

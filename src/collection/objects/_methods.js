module.exports = {
  get({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get',
      id: this.id,
      urlParams,
      json,
    }, done);
  },

  refresh({ urlParams, json = false } = {}, done) {
    return this.get({ urlParams, json }, done);
  },

  update({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'put',
      id: this.id,
      urlParams,
      body,
      json,
    }, done);
  },

  del({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'del',
      id: this.id,
      urlParams,
      json,
    }, done);
  },
};

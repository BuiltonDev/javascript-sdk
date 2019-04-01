module.exports = {
  get({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get',
      urlParams,
      json,
    }, done);
  },

  create({ body, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post',
      urlParams,
      body,
      json,
    }, done);
  },

  search({ query, urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', action: 'search', urlParams: Object.assign({}, urlParams, { query }), json,
    }, done);
  },
};

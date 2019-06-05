module.exports = ObjectClass => ({
  get({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get',
      urlParams,
      json,
    }, done);
  },

  getFromId(id, ...params) {
    const obj = new ObjectClass(this.request, id);
    return obj.get(...params);
  },

  del(id, ...params) {
    const obj = new ObjectClass(this.request, id);
    return obj.delete(...params);
  },

  update(id, ...params) {
    const obj = new ObjectClass(this.request, id);
    return obj.update(...params);
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

  setOne(props) {
    return new ObjectClass(this.request, props);
  },

  set(arrayOfProps) {
    const objects = [];
    arrayOfProps.forEach((props) => {
      objects.push(new ObjectClass(this.request, props));
    });
    return objects;
  },
});

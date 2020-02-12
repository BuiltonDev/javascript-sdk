module.exports = (ObjectClass) => ({
  getAll({
    page, size, urlParams, tags, json = false,
  } = {}, done) {
    return this.paginate({
      page,
      size,
      type: 'get',
      urlParams: { ...urlParams, ...(tags && { tags: tags.toString() }) },
      json,
    }, done);
  },

  getFromId(id, ...params) {
    const obj = new ObjectClass(this.request, id);
    return obj.get(...params);
  },

  get(...params) {
    if (typeof params[0] === 'string') {
      const id = params.splice(0, 1)[0];
      return this.getFromId(id, ...params);
    }
    return this.getAll(...params);
  },

  del(id, ...params) {
    const obj = new ObjectClass(this.request, id);
    return obj.del(...params);
  },

  update(id, ...params) {
    const obj = new ObjectClass(this.request, id);
    return obj.update(...params);
  },

  create(body, { urlParams, json = false } = {}, done) {
    return this.query({
      type: 'post',
      urlParams,
      body,
      json,
    }, done);
  },

  search(query, {
    page = 0, size = 100, tags, urlParams, json = false,
  } = {}, done) {
    return this.paginate({
      page, size, type: 'get', action: 'search', urlParams: { ...urlParams, query, ...(tags && { tags: tags.toString() }) }, json,
    }, done);
  },

  set(props) {
    if (Array.isArray(props)) {
      const arrayOfProps = props;
      const objects = [];
      // eslint-disable-next-line no-shadow
      arrayOfProps.forEach((props) => {
        objects.push(new ObjectClass(this.request, props));
      });
      return objects;
    }
    return new ObjectClass(this.request, props);
  },
});

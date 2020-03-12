const Error = require('../../utils/error');
const Pagination = require('../../utils/pagination');

// Abstract class
class Components {
  constructor(restFnArray = []) {
    if (this.constructor === Components) {
      throw new Error.AbstractClass();
    }

    const parseJson = (res, ResConstructor, rawJson) => {
      const json = res.body;
      if (rawJson || ResConstructor === null) {
        return json;
      }
      if (Array.isArray(json)) {
        const objArray = [];
        json.forEach((element) => {
          objArray.push(new ResConstructor(this.request, element));
        });
        return objArray;
      }
      if (typeof json === 'object') {
        if (ResConstructor) {
          return new ResConstructor(this.request, json);
        }
      }
      return json;
    };

    const doRequest = ({
      type = 'get',
      urlParams = {},
      body,
      apiPath = this.apiPath,
      action = '',
      ResConstructor = this.ResConstructor,
      isJsonBody = true,
      json,
    }) => {
      const actionLocal = (action && action[0] !== '/') ? `/${action}` : action;
      const path = `${apiPath}${actionLocal}`;
      try {
        return this.request.query({
          type, path, body, urlParams, isJsonBody,
        }).then((res) => {
          const obj = parseJson(res, ResConstructor, json);
          return Promise.resolve({ res, obj });
        }).catch((err) => Promise.reject(new Error.BadRequest(err)));
      } catch (err) {
        return Promise.reject(err);
      }
    };

    this.paginate = ({
      page = 0,
      size = 100,
      urlParams,
      ...args
    }, done) => doRequest({
      ...args, urlParams: { ...urlParams, page, size },
    }).then(({ res, obj }) => {
      const pagination = new Pagination(
        page,
        size,
        obj,
        res.headers['x-pagination-total'],
        this.query,
        urlParams,
        args,
      );
      if (done) {
        done(null, pagination);
      }
      return pagination;
    }).catch((err) => {
      if (done) {
        done(err);
      }
      return Promise.reject(err);
    });

    this.query = ({
      ...args
    }, done) => doRequest({ ...args })
      .then(({ res, obj }) => {
        if (done) {
          done(null, obj, res);
        }
        return obj;
      })
      .catch((err) => {
        if (done) {
          done(err);
        }
        return Promise.reject(err);
      });

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });
  }
}

module.exports = Components;

const Error = require('../../utils/error');

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
        }).catch(err => Promise.reject(err));
      } catch (err) {
        return Promise.reject(err);
      }
    };

    this.paginate = ({
      page = 0,
      size = 100,
      urlParams,
      ...args
    }, done) => {
      const getUrlParamsWithPagination = (currentPage, currentSize) => ({
        ...urlParams, page: currentPage, size: currentSize,
      });
      return doRequest({
        ...args, urlParams: getUrlParamsWithPagination(page, size),
      }).then(({ res, obj }) => {
        const queryFn = this.query;
        const Paginate = class {
          constructor() {
            this.page = page;
            this.size = size;
            this.current = obj;
            this.paginationTotal = res.headers['x-pagination-total'];
          }

          next(doneCallback) {
            if (this.page >= Math.floor(this.paginationTotal / this.size)) {
              return Promise.resolve(this.current);
            }
            this.page += 1;
            return queryFn({
              ...args,
              urlParams: getUrlParamsWithPagination(this.page, this.size),
            }, doneCallback)
              .then((newObj) => {
                this.current = newObj;
                return this.current;
              })
              .catch(err => Promise.reject(err));
          }

          previous(doneCallback) {
            if (this.page <= 0) {
              return Promise.resolve(this.current);
            }
            this.page -= 1;
            return queryFn({
              ...args,
              urlParams: getUrlParamsWithPagination(this.page, this.size),
            }, doneCallback)
              .then((newObj) => {
                this.current = newObj;
                return this.current;
              })
              .catch(err => Promise.reject(err));
          }

          goToPage(pageNb, doneCallback) {
            this.page = pageNb;
            return queryFn({
              ...args,
              urlParams: getUrlParamsWithPagination(this.page, this.size),
            }, doneCallback)
              .then((newObj) => {
                this.current = newObj;
                return this.current;
              })
              .catch(err => Promise.reject(err));
          }
        };
        const pagination = new Paginate();
        if (done) {
          done(pagination);
        }
        return pagination;
      }).catch((err) => {
        if (done) {
          done(err);
        }
        return Promise.reject(err);
      });
    };

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

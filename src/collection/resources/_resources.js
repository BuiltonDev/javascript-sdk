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

    const doRequest = async ({
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
        const res = await this.request.query({
          type, path, body, urlParams, isJsonBody,
        });
        const obj = parseJson(res, ResConstructor, json);
        return Promise.resolve({ res, obj });
      } catch (err) {
        return Promise.reject(err);
      }
    };

    this.paginate = async ({
      page = 0,
      size = 100,
      urlParams,
      ...args
    }, done) => {
      const getUrlParamsWithPagination = (currentPage, currentSize) => ({
        ...urlParams, page: currentPage, size: currentSize,
      });
      const { res, obj } = await doRequest({
        ...args, urlParams: getUrlParamsWithPagination(page, size),
      });
      const queryFn = this.query;
      return true;
      // const Paginate = class {
      //   constructor() {
      //     this.page = page;
      //     this.size = size;
      //     this.current = obj;
      //     this.paginationTotal = res.headers['x-pagination-total'];
      //   }

      //   async next(doneCallback) {
      //     this.page += 1;
      //     this.current = await queryFn({
      //       ...args,
      //       urlParams: getUrlParamsWithPagination(this.page, this.size),
      //     }, doneCallback);
      //     return this.current;
      //   }

      //   async previous(doneCallback) {
      //     this.page -= 1;
      //     this.current = await queryFn({
      //       ...args,
      //       urlParams: getUrlParamsWithPagination(this.page, this.size),
      //     }, doneCallback);
      //     return this.current;
      //   }

      //   async goToPage(pageNb, doneCallback) {
      //     this.page = pageNb;
      //     this.current = await queryFn({
      //       ...args,
      //       urlParams: getUrlParamsWithPagination(this.page, this.size),
      //     }, doneCallback);
      //     return this.current;
      //   }
      // };
      // const pagination = new Paginate();
      // if (done) {
      //   done(pagination);
      // }
      // return pagination;
    };

    this.query = async ({
      ...args
    }, done) => {
      try {
        const { res, obj } = await doRequest({ ...args });
        if (done) {
          done(null, obj, res);
        }
        return obj;
      } catch (err) {
        if (done) {
          done(err);
        }
        return Promise.reject(err);
      }
    };

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });
  }
}

module.exports = Components;

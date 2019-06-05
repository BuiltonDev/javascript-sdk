const Error = require('../../utils/error');

// Abstract class
class Components {
  constructor(restFnArray = []) {
    if (this.constructor === Components) {
      throw new Error.AbstractClass();
    }

    const prepParseJson = (ResConstructor, rawJson) => (res) => {
      const json = res.body;
      if (rawJson || ResConstructor === null) {
        return { obj: json, res };
      }
      if (Array.isArray(json)) {
        const objArray = [];
        json.forEach((element) => {
          objArray.push(new ResConstructor(this.request, element));
        });
        return { obj: objArray, res };
      }
      if (typeof json === 'object') {
        if (ResConstructor) {
          return { obj: new ResConstructor(this.request, json), res };
        }
      }
      return { obj: json, res };
    };

    this.query = ({
      type = 'get',
      urlParams = {},
      body,
      apiPath = this.apiPath,
      action = '',
      ResConstructor = this.ResConstructor,
      json,
    }, done) => {
      const actionLocal = (action && action[0] !== '/') ? `/${action}` : action;
      const path = `${apiPath}${actionLocal}`;
      const parseJson = prepParseJson(ResConstructor, json);
      return this.request.query({
        type, path, body, urlParams,
      }, parseJson, done);
    };

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });

    this.buildIdMethods = () => {
      Object.getOwnPropertyNames(this.ResConstructor.prototype).forEach((functionName) => {
        if (functionName !== 'constructor') {
          this[`${functionName}FromId`] = (id, ...params) => {
            const obj = new this.ResConstructor(this.request, id);
            obj[functionName](...params);
          };
        }
      });
    };
  }
}

module.exports = Components;

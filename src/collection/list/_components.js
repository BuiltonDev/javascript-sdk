const Error = require('../../utils/error');

// Abstract class
class Components {
  constructor(request, restFnArray) {
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
          objArray.push(new ResConstructor(request, element));
        });
        return { obj: objArray, res };
      }
      if (typeof json === 'object') {
        if (ResConstructor) {
          return { obj: new ResConstructor(request, json), res };
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
      return request.query({
        type, path, body, urlParams,
      }, parseJson, done);
    };

    this.get = ({ urlParams, json = false } = {}, done) => this.query({ type: 'get', urlParams, json }, done);

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });
  }
}

module.exports = Components;

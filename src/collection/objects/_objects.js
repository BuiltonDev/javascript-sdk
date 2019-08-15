const Error = require('../../utils/error');

// Abstract class
class Component {
  constructor(request, props, restFnArray = []) {
    if (this.constructor === Component) {
      throw new Error.AbstractClass();
    }

    this.id = null;

    if (typeof props === 'string') {
      this.id = props;
    } else {
      Object.assign(this, props);
      if (props && !props.id && props._id && props._id.$oid) {
        this.id = props._id.$oid;
      }
    }

    const parseJson = (res, ResConstructor, rawJson) => {
      const json = res.body;
      if (rawJson || ResConstructor === null || typeof json !== 'object') {
        return json;
      }
      if (ResConstructor) {
        if (Array.isArray(json)) {
          const objArray = [];
          json.forEach((element) => {
            objArray.push(new ResConstructor(request, element));
          });
          return objArray;
        }
        return new ResConstructor(request, json);
      }
      if (!this.id && json._id && json._id.$oid) {
        this.id = json._id.$oid;
      }
      return Object.assign(this, json);
    };

    this.query = ({
      type = 'get',
      urlParams = {},
      fullPath = null,
      resource = '',
      body,
      apiPath = this.apiPath,
      ResConstructor = this.constructor,
      json,
    }, done) => {
      if (!this.id && !fullPath) throw new Error.MethodNeedsId();
      const resourceLocal = (resource && resource[0] !== '/') ? `/${resource}` : resource;
      const path = fullPath || `${apiPath}/${this.id}${resourceLocal}`;

      return request.query({
        type, path, body, urlParams,
      })
        .then((res) => {
          const obj = parseJson(res, ResConstructor, json);
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
    };

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });
  }
}

module.exports = Component;

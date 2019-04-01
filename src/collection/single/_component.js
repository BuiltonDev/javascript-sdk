const Error = require('../../utils/error');

// Abstract class
class Component {
  constructor(request, props, restFnArray) {
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

    const prepParseJson = (ResConstructor, rawJson) => (res) => {
      const json = res.body;
      if (rawJson || ResConstructor === null || typeof json !== 'object') {
        return { obj: json, res };
      }
      if (ResConstructor) {
        return { obj: new ResConstructor(request, json), res };
      }
      if (!this.id && json._id && json._id.$oid) {
        this.id = json._id.$oid;
      }
      return { obj: Object.assign(this, json), res };
    };

    this.query = ({
      type = 'get',
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
      const parseJson = prepParseJson(ResConstructor, json);
      return request.query({ type, path, body }, parseJson, done);
    };

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });
  }
}

module.exports = Component;

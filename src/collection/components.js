const request = require('../utils/request');
const Error = require('../utils/error');

// Abstract class
class Components {
  constructor(props) {
    if (this.constructor === Components) {
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

    const parseJson = (json, ResConstructor, raw, done) => {
      if (raw || ResConstructor === null) {
        return done(null, json);
      } else if (Array.isArray(json)) {
        const objArray = [];
        json.forEach((element) => {
          if (ResConstructor) {
            objArray.push(new ResConstructor(element));
          } else {
            objArray.push(new this.constructor(element));
          }
        });
        return done(null, objArray);
      } else if (typeof json === 'object') {
        if (ResConstructor) {
          return done(null, new ResConstructor(json));
        }

        if (!this.id && json._id && json._id.$oid) {
          this.id = json._id.$oid;
        }

        return done(null, Object.assign(this, json));
      }

      return done(null, json);
    };

    this.simpleQuery = ({
      type = 'get',
      id = '',
      resource = '',
      urlParams = {},
      body,
      apiPath,
      ResConstructor,
      json,
    }, done) => {
      if (id === null) return done(new Error.MethodNeedsId());
      const idLocal = (id && id[0] !== '/') ? `/${id}` : id;
      const resourceLocal = (resource && resource[0] !== '/') ? `/${resource}` : resource;
      const apiPathLocal = apiPath || this.apiPath;
      const raw = json;
      request().query({ type, resource: `${apiPathLocal}${idLocal}${resourceLocal}`, urlParams, body }, (err, res) => {
        if (err || !res.ok) {
          return done(err, res);
        }

        return parseJson(res.body, ResConstructor, raw, done);
      });
    };

    this.buildQuery = (args, done) => (request().query(args, (err, res) => {
      if (err || !res.ok) {
        return done(err, res);
      }

      return parseJson(res.body, args.ResConstructor, args.json, done);
    }));
  }

  getAll({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', urlParams, json }, done);
  }

  get({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', id: this.id, urlParams, json }, done);
  }

  refresh({ urlParams, json = false }, done) {
    return this.get({ urlParams, json }, done);
  }

  update({ body, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'put', id: this.id, urlParams, body, json }, done);
  }

  del({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'del', id: this.id, urlParams, json }, done);
  }

  create({ body, urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'post', urlParams, body, json }, done);
  }
}

module.exports = Components;

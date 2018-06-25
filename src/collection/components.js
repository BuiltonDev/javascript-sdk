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

    const parseJson = (res, ResConstructor, rawJson, done) => {
      const json = res.body;
      if (rawJson || ResConstructor === null) {
        return done(null, json, res);
      } else if (Array.isArray(json)) {
        const objArray = [];
        json.forEach((element) => {
          if (ResConstructor) {
            objArray.push(new ResConstructor(element));
          } else {
            objArray.push(new this.constructor(element));
          }
        });
        return done(null, objArray, res);
      } else if (typeof json === 'object') {
        if (ResConstructor) {
          return done(null, new ResConstructor(json), res);
        }

        if (!this.id && json._id && json._id.$oid) {
          this.id = json._id.$oid;
        }

        return done(null, Object.assign(this, json), res);
      }

      return done(null, json, res);
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
      const rawJson = json;
      request().query({
        type, resource: `${apiPathLocal}${idLocal}${resourceLocal}`, urlParams, body,
      }, (err, res) => {
        if (err || !res.ok) {
          return done(err, null, res);
        }

        return parseJson(res, ResConstructor, rawJson, done);
      });
    };

    this.buildQuery = (args, done) => (request().query(args, (err, res) => {
      if (err || !res.ok) {
        return done(err, null, res);
      }

      return parseJson(res, args.ResConstructor, args.json, done);
    }));
  }
}

module.exports = Components;

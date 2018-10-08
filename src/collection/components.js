const request = require('../utils/request');
const Error = require('../utils/error');

// Abstract class
class Components {
  constructor(props, restFnArray) {
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

    const parseJson = (res, ResConstructor, rawJson) => {
      const json = res.body;
      if (rawJson || ResConstructor === null) {
        return { obj: json, res };
      }
      if (Array.isArray(json)) {
        const objArray = [];
        json.forEach((element) => {
          if (ResConstructor) {
            objArray.push(new ResConstructor(element));
          } else {
            objArray.push(new this.constructor(element));
          }
        });
        return { obj: objArray, res };
      }
      if (typeof json === 'object') {
        if (ResConstructor) {
          return { obj: new ResConstructor(json), res };
        }

        if (!this.id && json._id && json._id.$oid) {
          this.id = json._id.$oid;
        }

        return { obj: Object.assign(this, json), res };
      }
      return { obj: json, res };
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
      const doQuery = (resolve = undefined, reject = undefined, isPromise = false) => {
        request().query({
          type, resource: `${apiPathLocal}${idLocal}${resourceLocal}`, urlParams, body,
        }, (err, res) => {
          if (err || !res.ok) {
            if (isPromise) {
              return reject(err, res);
            }
            return done(err, null, res);
          }

          const result = parseJson(res, ResConstructor, rawJson);
          if (isPromise) {
            return resolve(result.obj, result.res);
          }
          return done(null, result.obj, result.res);
        });
      };
      if (!done) {
        return new Promise(((resolve, reject) => doQuery(resolve, reject, true)));
      }
      doQuery();
    };

    this.buildQuery = (args, done) => {
      const doQuery = (resolve = undefined, reject = undefined, isPromise = false) => {
        (request().query(args, (err, res) => {
          if (err || !res.ok) {
            if (isPromise) {
              return reject(err, res);
            }
            return done(err, null, res);
          }

          const result = parseJson(res, args.ResConstructor, args.json, done);
          if (isPromise) {
            return resolve(result.obj, result.res);
          }
          return done(null, result.obj, result.res);
        }));
      };
      if (!done) {
        return new Promise(((resolve, reject) => doQuery(resolve, reject, true)));
      }
      doQuery();
    };

    restFnArray.forEach((restFn) => {
      this[restFn.name] = restFn;
    });
  }
}

module.exports = Components;

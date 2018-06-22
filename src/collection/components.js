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

    const parseJson = (res, ResConstructor, rawJson) => {
      const json = res.body;
      if (rawJson || ResConstructor === null) {
        return { obj: json, res };
      } else if (Array.isArray(json)) {
        const objArray = [];
        json.forEach((element) => {
          if (ResConstructor) {
            objArray.push(new ResConstructor(element));
          } else {
            objArray.push(new this.constructor(element));
          }
        });
        return { obj: objArray, res };
      } else if (typeof json === 'object') {
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
  }

  getAll({ urlParams, json = false }, done) {
    return this.simpleQuery({ type: 'get', urlParams, json }, done);
  }

  get({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'get', id: this.id, urlParams, json,
    }, done);
  }

  refresh({ urlParams, json = false }, done) {
    return this.get({ urlParams, json }, done);
  }

  update({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'put', id: this.id, urlParams, body, json,
    }, done);
  }

  del({ urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'del', id: this.id, urlParams, json,
    }, done);
  }

  create({ body, urlParams, json = false }, done) {
    return this.simpleQuery({
      type: 'post', urlParams, body, json,
    }, done);
  }
}

module.exports = Components;

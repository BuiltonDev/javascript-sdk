const Components = require('./components');

class AIModel extends Components {
  constructor(props) {
    super(props);
    this.apiPath = 'ai/models';
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  refresh({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  update({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  // Override
  // eslint-disable-next-line no-unused-vars
  del({ body, urlParams }, done) {
    throw new Error.NotImplemented();
  }

  train({ urlParam, json = false }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id, urlParam, resource: 'train', json,
    }, done);
  }

  getRecommendations({ body, urlParams }, done) {
    return this.simpleQuery({
      type: 'post', id: this.id || '', resource: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }
}

module.exports = AIModel;

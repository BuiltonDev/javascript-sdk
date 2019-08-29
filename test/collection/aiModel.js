const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');

const modelCreatedFile = require('../fetchmock/modelCreated.json');
const modelReadyFile = require('../fetchmock/modelReady.json');
const modelsFile = require('../fetchmock/models.json');
const recommendationsFile = require('../fetchmock/recommendations.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

describe('AI', () => {
  describe('GET ai/models', () => {
    it('Should return a list of models', (done) => {
      nock(endpoint)
        .get('/ai/models')
        .query({ size: 10, page: 0 })
        .reply(200, modelsFile);
      sa.aiModels.get({ page: 0, size: 10 }, (err, models) => {
        if (err) throw err;
        assert.ok(Array.isArray(models.current));
        done();
      });
    });
  });

  describe('POST ai/models', () => {
    it('Should create a new ai model based on type, source and destination', (done) => {
      nock(endpoint)
        .post('/ai/models')
        .reply(200, modelCreatedFile);
      sa.aiModels.create({ model_type: 'content_recommender', source: 'product', destination: 'product' }, {}, (err, model) => {
        if (err) throw err;
        assert.ok(model.constructor.name === 'AIModel');
        assert.ok(model.training_status === 'CREATED');
        done();
      });
    });
  });

  describe('GET ai/models/<modelId>', () => {
    it('Should return details about one specific model', (done) => {
      nock(endpoint)
        .get('/ai/models/:modelId:')
        .reply(200, modelReadyFile);
      sa.aiModels.get(':modelId:', {}, (err, model) => {
        if (err) throw err;
        assert.ok(model.constructor.name === 'AIModel');
        assert.ok(model.training_status === 'READY');
        done();
      });
    });
  });

  describe('POST ai/models/<modelId>/invoke', () => {
    it('Should return recommendation for a given source based on a specific model', (done) => {
      nock(endpoint)
        .post('/ai/models/:modelId:/invoke')
        .reply(200, recommendationsFile);
      sa.aiModels.set(':modelId:').getRecommendations({ source_id: '5aec176d1f7cdc0008848f87', size: 4 }, {}, (err, recommendations) => {
        if (err) throw err;
        assert.ok(Array.isArray(recommendations.response));
        done();
      });
    });
  });
});

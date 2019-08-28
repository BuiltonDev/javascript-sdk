/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const modelCreatedFile = require('../fetchmock/modelCreated.json');
const modelReadyFile = require('../fetchmock/modelReady.json');
const modelsFile = require('../fetchmock/models.json');
const recommendationsFile = require('../fetchmock/recommendations.json');

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

describe('AI', () => {
  beforeEach(() => {
    // Guarantee each test knows exactly which routes are defined
    mock.clearRoutes();
  });

  describe('GET ai/models', () => {
    it('Should return a list of models', (done) => {
      url = `${endpoint}ai/models`;
      mock.get(url, () => ({ body: modelsFile, ok: true }));
      sa.aiModels.get({}, (err, models) => {
        if (err) throw err;
        assert.ok(Array.isArray(models));
        done();
      });
    });
  });

  describe('POST ai/models', () => {
    it('Should create a new ai model based on type, source and destination', (done) => {
      url = `${endpoint}ai/models`;
      mock.post(url, () => ({ body: modelCreatedFile, ok: true }));
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
      url = `${endpoint}ai/models/:modelId:`;
      mock.get(url, () => ({ body: modelReadyFile, ok: true }));
      sa.aiModels.getFromId(':modelId:', {}, (err, model) => {
        if (err) throw err;
        assert.ok(model.constructor.name === 'AIModel');
        assert.ok(model.training_status === 'READY');
        done();
      });
    });
  });

  describe('POST ai/models/<modelId>/invoke', () => {
    it('Should return recommendation for a given source based on a specific model', (done) => {
      url = `${endpoint}ai/models/:modelId/invoke`;
      mock.post(url, () => ({ body: recommendationsFile, ok: true }));
      sa.aiModels.set(':modelId:').getRecommendations({ source_id: '5aec176d1f7cdc0008848f87', size: 4 }, {}, (err, recommendations) => {
        if (err) throw err;
        assert.ok(Array.isArray(recommendations.response));
        done();
      });
    });
  });
});

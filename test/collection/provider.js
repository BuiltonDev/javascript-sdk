/* global it, describe, require, console */
const assert = require('assert');
const Kvass = require('../../src/main.js');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Kvass({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const providersFile = require('../fetchmock/providers.json');
const providerFile = require('../fetchmock/provider.json');
const providerReportsFile = require('../fetchmock/providerReports.json');
const ratingFile = require('../fetchmock/ratings.json');
const availableCountFile = require('../fetchmock/availableCount.json');

describe('Provider related tests', () => {
  it('Should return a list of Providers', (done) => {
    url = `${endpoint}providers`;
    mock.get(url, () => ({ body: providersFile, ok: true }));
    sa.provider().getAll({}, (err, providers) => {
      assert.ok(Array.isArray(providers));
      assert.ok(providers[0].constructor.name === 'Provider');
      done();
    });
  });
  it('Should return a provider', (done) => {
    url = `${endpoint}providers/:providerId:`;
    mock.get(url, () => ({ body: providerFile, ok: true }));
    sa.provider(':providerId:').get({}, (err, provider) => {
      assert.ok((provider.first_name === providerFile.first_name));
      assert.ok(provider.constructor.name === 'Provider');
      done();
    });
  });
  it('Should create a provider', (done) => {
    url = `${endpoint}v2/providers`;
    mock.post(url, () => ({ body: providerFile, ok: true }));

    // TODO Create JSON payload for creating a provider
    sa.provider().create({ body: {} }, (err, provider) => {
      assert.ok((provider.first_name === providerFile.first_name));
      assert.ok(provider.constructor.name === 'Provider');
      done();
    });
  });
  it('Should return a provider ratings', (done) => {
    url = `${endpoint}providers/:providerId:/ratings`;
    mock.get(url, () => ({ body: ratingFile, ok: true }));
    sa.provider(':providerId:').getRating({}, (err, json) => {
      assert.ok(Array.isArray(json));
      done();
    });
  });
  it('Should search providers', (done) => {
    url = `${endpoint}providers/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: providersFile, ok: true }));
    sa.provider().search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, providers) => {
      assert.ok(Array.isArray(providers));
      assert.ok(providers[1].constructor.name === 'Provider');
      done();
    });
  });
  it('Should search availableCount', (done) => {
    url = `${endpoint}providers/available-count?when=1496324988599&duration=1`;
    mock.get(url, () => ({ body: availableCountFile, ok: true }));
    sa.provider().getAvailableCount(
      { urlParams: { when: 1496324988599, duration: 1 } },
      (err, json) => {
        assert.ok((json.timestamp));
        done();
      },
    );
  });
  it('Should getAllReports', (done) => {
    url = `${endpoint}providers/reports-count`;
    mock.get(url, () => ({ body: providerReportsFile, ok: true }));
    sa.provider().getAllReports({}, (err, json) => {
      assert.ok((json.total_order_count));
      done();
    });
  });
});

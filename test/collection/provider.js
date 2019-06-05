/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
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
    sa.providers.get({}, (err, providers) => {
      assert.ok(Array.isArray(providers));
      assert.ok(providers[0].constructor.name === 'Provider');
      done();
    });
  });
  it('Should return a provider', (done) => {
    url = `${endpoint}providers/:providerId:`;
    mock.get(url, () => ({ body: providerFile, ok: true }));
    sa.providers.getFromId(':providerId:', {}, (err, provider) => {
      assert.ok((provider.first_name === providerFile.first_name));
      assert.ok(provider.constructor.name === 'Provider');
      done();
    });
  });
  it('Should create a provider', (done) => {
    url = `${endpoint}v2/providers`;
    mock.post(url, () => ({ body: providerFile, ok: true }));

    // TODO Create JSON payload for creating a provider
    sa.providers.create({ body: {} }, (err, provider) => {
      assert.ok((provider.first_name === providerFile.first_name));
      assert.ok(provider.constructor.name === 'Provider');
      done();
    });
  });
  it('Should return a provider ratings', (done) => {
    url = `${endpoint}providers/:providerId:/ratings`;
    mock.get(url, () => ({ body: ratingFile, ok: true }));
    sa.providers.setOne(':providerId:').getRating({}, (err, json) => {
      assert.ok(Array.isArray(json));
      done();
    });
  });
  it('Should search providers', (done) => {
    url = `${endpoint}providers/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: providersFile, ok: true }));
    sa.providers.search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, providers) => {
      assert.ok(Array.isArray(providers));
      assert.ok(providers[1].constructor.name === 'Provider');
      done();
    });
  });
  it('Should search availableCount', (done) => {
    url = `${endpoint}providers/available-count?when=1496324988599&duration=1`;
    mock.get(url, () => ({ body: availableCountFile, ok: true }));
    sa.providers.getAvailableCount(
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
    sa.providers.getReports({}, (err, json) => {
      assert.ok((json.total_order_count));
      done();
    });
  });
});

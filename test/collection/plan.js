/* global it, describe, require, console */
const assert = require('assert');
const Kvass = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Kvass({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const plansFile = require('../fetchmock/plans.json');

describe('Plan related tests', () => {
  it('Should return all the plans', (done) => {
    url = `${endpoint}plans`;
    mock.get(url, () => ({ body: plansFile, ok: true }));
    sa.plan().getAll({}, (err, plans) => {
      assert.ok(Array.isArray(plans));
      assert.ok(plansFile[0]._id.$oid === plans[0].id);
      done();
    });
  });
});

/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Builton({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const webhooksFile = require('../fetchmock/webhooks.json');

describe('Webhook related tests', () => {
  it('Should return all the webhooks', (done) => {
    url = `${endpoint}webhooks`;
    mock.get(url, () => ({ body: webhooksFile, ok: true }));
    sa.webhook().getAll({}, (err, wh) => {
      assert.ok(Array.isArray(wh));
      assert.ok(webhooksFile[0]._id.$oid === wh[0].id);
      done();
    });
  });
});

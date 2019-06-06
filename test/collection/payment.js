/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const paymentsFile = require('../fetchmock/payments.json');

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

describe('Payment related tests', () => {
  it('Should list payments', (done) => {
    url = `${endpoint}payments?size=4&page=1`;
    mock.get(url, () => ({ body: paymentsFile, ok: true }));
    sa.payments.get({ urlParams: { size: 4, page: 1 } }, (err, payments) => {
      if (err) throw err;
      assert.ok(paymentsFile[0]._id.$oid === payments[0].id);
      done();
    });
  });
});

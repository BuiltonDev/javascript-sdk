/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const paymentMethodsFile = require('../fetchmock/paymentMethods.json');

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

describe('Payment method', () => {
  it('Should return all the payment methods', (done) => {
    url = `${endpoint}payment_methods`;
    mock.get(url, () => ({ body: paymentMethodsFile, ok: true }));
    sa.paymentMethods.get({}, (err, pms) => {
      if (err) throw err;
      assert.ok(pms[0]._id.$oid === pms[0].id);
      done();
    });
  });
});

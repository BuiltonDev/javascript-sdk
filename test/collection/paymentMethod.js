/* global it, describe, require, console */
const Shareactor = require('../../src/main.js');
const assert = require('assert');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const paymentMethodsFile = require('../fetchmock/paymentMethods.json');

const endpoint = 'https://example.com/';
const sa = new Shareactor({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

describe('Payment methods related tests', () => {
  it('Should return all the payment methods', (done) => {
    url = `${endpoint}payment_methods`;
    mock.get(url, () => ({ body: paymentMethodsFile, ok: true }));
    sa.paymentMethod().getAll({}, (err, pms) => {
      if (err) throw err;
      assert.ok(pms[0]._id.$oid === pms[0].id);
      done();
    });
  });
});

/* global it, describe, require, console */
const Kvass = require('../../src/main.js');
const assert = require('assert');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const paymentsFile = require('../fetchmock/payments.json');
const paymentFile = require('../fetchmock/payment.json');

const endpoint = 'https://example.com/';
const sa = new Kvass({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

describe('Payment related tests', () => {
  it('Should delete a payment', (done) => {
    url = `${endpoint}payments/${paymentFile._id.$oid}`;
    mock.del(url, () => ({ body: paymentFile, ok: true }));
    sa.payment(paymentFile._id.$oid).del({}, (err, payment) => {
      if (err) throw err;
      assert.ok(paymentFile._id.$oid === payment.id);
      done();
    });
  });

  it('Should list payments', (done) => {
    url = `${endpoint}payments?size=4&page=1`;
    mock.get(url, () => ({ body: paymentsFile, ok: true }));
    sa.payment().getAll({ urlParams: { size: 4, page: 1 } }, (err, payments) => {
      if (err) throw err;
      assert.ok(paymentsFile[0]._id.$oid === payments[0].id);
      done();
    });
  });
});

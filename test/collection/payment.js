/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');

const paymentsFile = require('../fetchmock/payments.json');
const paymentConfirmedFile = require('../fetchmock/paymentConfirmed.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

describe('Payment related tests', () => {
  it('Should list payments', async () => {
    nock(endpoint)
      .get('/payments')
      .query({ size: 4, page: 1 })
      .reply(200, paymentsFile);
    const payments = await sa.payments.get({ urlParams: { size: 4, page: 1 } });
    assert.ok(paymentsFile[0]._id.$oid === payments[0].id);
  });

  it('Should confirm the payment (SCA re-authentication)', async () => {
    nock(endpoint)
      .post('/payments/:paymentId:/confirm')
      .reply(200, paymentConfirmedFile);
    const payment = await sa.payments.set(':paymentId:').confirm({
      body: {
        payment_intent_id: ':payment_intent_id:',
        payment_client_secret: ':payment_client_secret:',
      },
    });
    assert.ok(paymentConfirmedFile._id.$oid === payment._id.$oid);
  });
});

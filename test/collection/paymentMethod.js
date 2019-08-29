const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const paymentMethodsList = require('../fetchmock/paymentMethods.json');
const paymentMethodWithIntent = require('../fetchmock/paymentMethodWithIntent.json');
const paymentMethodWithCard = require('../fetchmock/paymentMethodWithCard.json');
const paymentMethodDeleted = require('../fetchmock/paymentMethodDeleted.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

describe('Payment methods related tests', () => {
  it('Should create a new payment method with Stripe to get setup intent (SCA)', async () => {
    nock(endpoint)
      .post('/payment_methods')
      .reply(200, paymentMethodWithIntent);

    const paymentMethod = await sa.paymentMethods.create({ payment_method: 'stripe' });
    assert.ok(paymentMethod._id.$oid === paymentMethodWithIntent._id.$oid);
  });
  it('Should update an exisiting payment method with Stripe payment method id', async () => {
    nock(endpoint)
      .put('/payment_methods/:payment_method_id:')
      .reply(200, paymentMethodWithCard);
    const paymentMethod = await sa.paymentMethods.set(':payment_method_id:').update({ payment_method_id: 'pm_fake_payment_method_id' });
    assert.ok(paymentMethod.source === 'pm_fake_payment_method_id');
    assert.ok(paymentMethod.card);
    assert.ok(paymentMethod.is_sca_compatible);
  });
  it('Should return all the payment methods', async () => {
    nock(endpoint)
      .get('/payment_methods')
      .query({ size: 100, page: 0 })
      .reply(200, paymentMethodsList);
    const paymentMethods = await sa.paymentMethods.get({});
    assert.ok(paymentMethods.current[0]._id.$oid === paymentMethodsList[0]._id.$oid);
  });
  it('Should delete a payment method from the user', async () => {
    nock(endpoint)
      .delete('/payment_methods/:payment_method_id:')
      .reply(200, paymentMethodDeleted);
    const paymentMethod = await sa.paymentMethods.set(':payment_method_id:').del();
    assert.ok(paymentMethod.deleted);
    assert.ok(!paymentMethod.active);
  });
});

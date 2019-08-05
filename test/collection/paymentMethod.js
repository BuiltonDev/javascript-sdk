/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const paymentMethodsList = require('../fetchmock/paymentMethods.json');
const paymentMethodWithIntent = require('../fetchmock/paymentMethodWithIntent.json');
const paymentMethodWithCard = require('../fetchmock/paymentMethodWithCard.json');
const paymentMethodDeleted = require('../fetchmock/paymentMethodDeleted.json');

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

describe('Payment methods related tests', () => {
  it('Should create a new payment method with Stripe to get setup intent (SCA)', async () => {
    url = `${endpoint}payment_methods`;
    mock.post(url, () => ({ body: paymentMethodWithIntent, ok: true }));

    const paymentMethod = await sa.paymentMethods.create({ body: { payment_method: 'stripe' } });
    assert.ok(paymentMethod._id.$oid === paymentMethodWithIntent._id.$oid);
  });
  it('Should update an exisiting payment method with Stripe payment method id', async () => {
    url = `${endpoint}payment_methods/fake_id`;
    mock.put(url, () => ({ body: paymentMethodWithCard, ok: true }));

    const paymentMethod = await sa.paymentMethods.set('fake_id').update({ body: { payment_method_id: 'pm_fake_payment_method_id' } });
    assert.ok(paymentMethod.source === 'pm_fake_payment_method_id');
    assert.ok(paymentMethod.card);
    assert.ok(paymentMethod.is_sca_compatible);
  });
  it('Should return all the users payment methods', async () => {
    url = `${endpoint}payment_methods`;
    mock.get(url, () => ({ body: paymentMethodsList, ok: true }));

    const paymentMethods = await sa.paymentMethods.get({});
    assert.ok(paymentMethods[0]._id.$oid === paymentMethodsList[0]._id.$oid);
  });
  it('Should delete a payment method from the user', async () => {
    url = `${endpoint}payment_methods/fake_id`;
    mock.del(url, () => ({ body: paymentMethodDeleted, ok: true }));

    const paymentMethod = await sa.paymentMethods.set('fake_id').del();
    assert.ok(paymentMethod.deleted);
    assert.ok(!paymentMethod.active);
  });
});

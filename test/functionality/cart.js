/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const orderFile = require('../fetchmock/order.json');
const scaFailedOrderFile = require('../fetchmock/orderPaySCAFailed.json');

describe.only('Cart', () => {
  it('Should return current cart', () => {
    assert.ok(sa.cart.get().length === 0);
  });
  it('Should add product to cart', () => {
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    assert.ok(sa.cart.get().length === 1);
    assert.ok(sa.cart.get()[0].productId === ':productId:');
  });
  it('Should remove product from cart', () => {
    sa.cart.removeProduct(':productId:');
    assert.ok(!sa.cart.get().length);
  });
  it('Should empty entire cart', () => {
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    sa.cart.addProduct({ productId: ':productId2:', quantity: 1 });

    sa.cart.empty();
    assert.ok(!sa.cart.get().length);
  });
  it('Should checkout and pay for cart', async () => {
    url = `${endpoint}orders`;
    const url2 = `${endpoint}orders/592bde24b738ff0013adf5c7/pay`;
    mock.post(url, () => ({ body: orderFile, ok: true }));
    mock.post(url2, () => ({ body: orderFile, ok: true }));

    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });

    const paidOrder = await sa.cart.checkout(':paymentMethodId', {
      street_name: 'Slottsplassen 1',
      zip_code: '0010',
      city: 'Oslo',
      country: 'Norway',
      geo: [59.909848, 10.7379474],
    });
    assert.ok(!sa.cart.get().length);
    assert.ok(paidOrder.order_status === 'SUCCESS');
  });
  it('Should allow you to recover checkout process if process failed due to SCA reauthentication', async () => {
    url = `${endpoint}orders`;
    const url2 = `${endpoint}orders/592bde24b738ff0013adf5c7/pay`;
    mock.post(url, () => ({ body: orderFile, ok: true }));
    mock.post(url2, () => ({ status: 422, body: scaFailedOrderFile, ok: false }));

    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    const paymentMethodId = ':paymentMethodId:';
    const deliveryAddress = {
      street_name: 'Slottsplassen 1',
      zip_code: '0010',
      city: 'Oslo',
      country: 'Norway',
      geo: [59.909848, 10.7379474],
    };

    try {
      await sa.cart.checkout(paymentMethodId, deliveryAddress);
    } catch (error) {
      assert.ok(error.status === 422);
      mock.post(url2, () => ({ body: orderFile, ok: true }));
      assert.ok(sa.cart.get().length);
      const retryOrder = await sa.cart.checkout(paymentMethodId, deliveryAddress, '592bde24b738ff0013adf5c7');
      assert.ok(!sa.cart.get().length);
      assert.ok(retryOrder.order_status === 'SUCCESS');
    }
  });
});

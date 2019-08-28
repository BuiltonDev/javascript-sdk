/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const orderFile = require('../fetchmock/order.json');
const scaFailedOrderFile = require('../fetchmock/orderPaySCAFailed.json');

describe('Cart', () => {
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
  it('Should throw error when adding subproduct without product into cart', () => {
    try {
      sa.cart.addSubproduct(':subProductId:', ':productId:');
    } catch (err) {
      assert.ok(err.message === 'Product is not in cart');
    }
  });
  it('Should add subproduct to cart', () => {
    sa.cart.addProduct({ productId: ':productId:', quantity: 1 });
    sa.cart.addSubproduct(':subProductId:', ':productId:');
    assert.ok(sa.cart.get().length === 1);
    assert.ok(sa.cart.get()[0].productId === ':productId:');
    assert.ok(sa.cart.get()[0].subProducts.indexOf(':subProductId:') > -1);
  });
  it('Should remove subproduct from cart', () => {
    sa.cart.removeSubproduct(':subProductId', ':productId:');
    assert.ok(sa.cart.get().length === 1);
    assert.ok(sa.cart.get()[0].productId === ':productId:');
    assert.ok(!sa.cart.get()[0].subProducts.length);
  });
  it('Should empty entire cart', () => {
    sa.cart.addProduct({ product: ':productId:', quantity: 2 });
    sa.cart.addProduct({ product: ':productId2:', quantity: 1 });

    sa.cart.empty();
    assert.ok(!sa.cart.get().length);
  });
  it('Should checkout and pay for cart', async () => {
    nock(endpoint)
      .post('/orders')
      .reply(200, orderFile);

    nock(endpoint)
      .post('/orders/592bde24b738ff0013adf5c7/pay')
      .reply(200, orderFile);

    sa.cart.addProduct({ product: ':productId:', quantity: 2 });

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
    nock(endpoint)
      .post('/orders')
      .reply(200, orderFile);

    nock(endpoint)
      .post('/orders/592bde24b738ff0013adf5c7/pay')
      .reply(422, scaFailedOrderFile);

    sa.cart.addProduct({ product: ':productId:', quantity: 2 });
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
      nock(endpoint)
        .post('/orders/592bde24b738ff0013adf5c7/pay')
        .reply(200, orderFile);
      assert.ok(sa.cart.get().length);
      const retryOrder = await sa.cart.checkout(paymentMethodId, deliveryAddress, '592bde24b738ff0013adf5c7');
      assert.ok(!sa.cart.get().length);
      assert.ok(retryOrder.order_status === 'SUCCESS');
    }
  });
});

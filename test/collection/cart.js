/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const emptyCartFile = require('../fetchmock/cartEmpty.json');
const fullCartFile = require('../fetchmock/cartFull.json');

describe('Cart', () => {
  it('Should create new cart', async () => {
    url = `${endpoint}orders`;
    mock.post(url, () => ({ ok: true }));

    const cart = await sa.cart();
    assert.ok(cart);
  });
  it('Should return existing cart given id', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.get(url, () => ({ body: emptyCartFile, ok: true }));

    const cart = await sa.cart(':cartId:');
    assert.ok(cart._id.$oid === ':cartId:');
  });
  it('Should be able to load entire cart from json', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.get(url, () => ({ body: emptyCartFile, ok: true }));

    const cart = await sa.cart(emptyCartFile);
    assert.ok(cart._id.$oid === emptyCartFile._id.$oid);
  });
  it('Should throw error if loading already paid for cart', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.get(url, () => ({ body: fullCartFile, ok: true }));

    try {
      await sa.cart(fullCartFile);
    } catch (error) {
      assert.ok(error.message === 'Cart is already processed and paid for.');
    }
  });
  it('Should add product to existing cart', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.put(url, () => ({ body: fullCartFile, ok: true }));

    const cart = await sa.cart(emptyCartFile).addProduct(':productId:');
    assert.ok(cart.products.length === 1);
  });
  it('Should remove product from existing cart', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.put(url, () => ({ body: fullCartFile, ok: true }));

    const cart = await sa.cart(fullCartFile).removeProduct(':productId:');
    assert.ok(!cart.products.length);
  });
  it('Should empty entire cart', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.put(url, () => ({ body: fullCartFile, ok: true }));

    const cart = await sa.cart(fullCartFile).empty();
    assert.ok(!cart.products.length);
  });
  it('Should checkout cart', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.put(url, () => ({ body: fullCartFile, ok: true }));

    // The users bearerToken will be verified during checkout
    // Payment_method_id is mandatory
    const cart = await sa.cart(fullCartFile).checkout({ paymentMethodId: ':paymentMethodId', deliveryAddress: '', deliveryTime: '' });
    assert.ok(cart.status === 'SUCCESS');
  });
  it('Should throw error on checkout if user is not authenticated', async () => {
    url = `${endpoint}orders/:cartId:`;
    mock.put(url, () => ({ body: fullCartFile, ok: true }));

    try {
      await sa.cart(fullCartFile).checkout(':userId:');
    } catch (error) {
      assert.ok(error.message === 'User needs to be authenticated before cart can be checked out');
    }
  });
});

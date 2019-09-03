const assert = require('assert');
const Builton = require('../../src/main.js');
const Cart = require('../../src/functionality/cart');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const orderFile = require('../fetchmock/order.json');
const scaFailedOrderFile = require('../fetchmock/orderPaySCAFailed.json');

describe('Cart', () => {
  beforeEach(() => {
    sa.cart.empty();
  });
  it('Should return current cart', () => {
    assert.ok(sa.cart.get().length === 0);
  });
  it('Should return product index in cart', () => {
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    sa.cart.addProduct({ productId: ':productId2:', quantity: 2 });
    /* */
    const index = sa.cart._findProductIndex(':productId2:');
    assert.equal(index, 1);
  });
  it('Should return true that cart is valid when all items have at least productId and quantity', () => {
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    sa.cart.addProduct({ productId: ':productId2:', quantity: 2, subProducts: [':subProductId:'] });
    /* */
    assert.ok(sa.cart._isCartValid());
  });
  it('Should return that cart is invalid when its missing productId or quantity', () => {
    /* Setup */
    sa.cart.set([{ productId: ':productId:' }]);
    sa.cart.addProduct({ productId: ':productId2:', quantity: 2 });
    /* */
    assert.ok(!sa.cart._isCartValid());
  });
  it('Should compare two arrays of subproducts', () => {
    assert.ok(Cart._compareSubproducts([':subProductA:', ':subProductB:'], [':subProductA:', ':subProductB:']));
    assert.ok(Cart._compareSubproducts([':subProductB:', ':subProductA:'], [':subProductA:', ':subProductB:']));
    assert.ok(!Cart._compareSubproducts([':subProductB:', ':subProductA:'], [':subProductA:', ':subProductC:']));
  });
  it('Should add (new) product to cart', () => {
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    assert.ok(sa.cart.get().length === 1);
    assert.ok(sa.cart.get()[0].productId === ':productId:');
  });
  it('Should remove product from cart when input quantity equals cart quantity', () => {
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    /* */
    sa.cart.removeProduct({ productId: ':productId:', quantity: 2 });
    assert.ok(!sa.cart.get().length);
  });
  it('Should decrement the quantity of a product from the cart', () => {
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    /* */
    sa.cart.removeProduct({ productId: ':productId:', quantity: 1 });
    assert.ok(sa.cart.get().length);
    assert.ok(sa.cart.get()[0].quantity === 1);
  });
  it('Should increment the quantity of a product from the cart', () => {
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2 });
    /* */
    sa.cart.addProduct({ productId: ':productId:', quantity: 1 });
    assert.ok(sa.cart.get().length);
    assert.ok(sa.cart.get()[0].quantity === 3);
  });
  it('Should add product as new item in cart when subproducts differ', () => {
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2, subProducts: [':subProductA:'] });
    /* */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2, subProducts: [':subProductB:'] });
    assert.ok(sa.cart.get().length === 2);
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
    /* Setup */
    sa.cart.addProduct({ productId: ':productId:', quantity: 2, subProducts: [':subProductId:'] });
    /* */
    sa.cart.removeSubproduct(':subProductId:', ':productId:');
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

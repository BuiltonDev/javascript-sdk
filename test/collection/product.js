/* global it, describe, require, console */
const Shareactor = require('../../src/main.js');
const assert = require('assert');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Shareactor({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const productsFile = require('../fetchmock/products.json');
const productFile = require('../fetchmock/product.json');

describe('Product related tests', () => {
  it('Should return a list of Products', (done) => {
    url = `${endpoint}products`;
    mock.get(url, () => ({ body: productsFile, ok: true }));
    sa.product().getAll({}, (err, products) => {
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should return a product', (done) => {
    url = `${endpoint}products/:productId:`;
    mock.get(url, () => ({ body: productFile, ok: true }));
    sa.product(':productId:').get({}, (err, product) => {
      assert.ok((product.name === 'Test Product'));
      assert.ok(product.constructor.name === 'Product');
      done();
    });
  });
  it('Should delete a product', (done) => {
    url = `${endpoint}products/:productId:`;
    mock.del(url, () => ({ body: productFile, ok: true }));
    sa.product(':productId:').del({}, (err, product) => {
      assert.ok((product.name === 'Test Product'));
      assert.ok(product.constructor.name === 'Product');
      done();
    });
  });
  it('Should search products', (done) => {
    url = `${endpoint}products/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: productsFile, ok: true }));
    sa.product().search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, products) => {
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
});

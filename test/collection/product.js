/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const productsFile = require('../fetchmock/products.json');
const productFile = require('../fetchmock/product.json');

describe('Product', () => {
  beforeEach(() => {
    // Guarantee each test knows exactly which routes are defined
    mock.clearRoutes();
  });
  it('Should return a list of Products', (done) => {
    url = `${endpoint}products`;
    mock.get(url, () => ({ body: productsFile, ok: true }));
    sa.products.get({}, (err, products) => {
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should return a list of with pagination', (done) => {
    url = `${endpoint}products`;
    const headers = { 'X-Pagination-Total': 212 };
    mock.get(url, () => ({ body: productsFile, ok: true, headers }));
    sa.products.get({ size: 2, page: 0 }, (err, products, raw) => {
      assert.ok(raw.headers === headers);
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should return a product', (done) => {
    url = `${endpoint}products/:productId:`;
    mock.get(url, () => ({ body: productFile, ok: true }));
    sa.products.set(':productId:').get({}, (err, product) => {
      assert.ok((product.name === 'Test Product'));
      assert.ok(product.constructor.name === 'Product');
      done();
    });
  });
  it('Should search products', (done) => {
    url = `${endpoint}products/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: productsFile, ok: true }));
    sa.products.search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, products) => {
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
});

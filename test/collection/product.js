/* global it, describe, require */
const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const productsFile = require('../fetchmock/products.json');
const productFile = require('../fetchmock/product.json');

describe('Product related tests', () => {
  it('Should return a list of Products', (done) => {
    nock(endpoint)
      .get('/products')
      .reply(200, productsFile);
    sa.products.get({}, (err, products) => {
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should return a product', (done) => {
    nock(endpoint)
      .get('/products/:productId:')
      .reply(200, productFile);
    sa.products.set(':productId:').get({}, (err, product) => {
      assert.ok((product.name === 'Test Product'));
      assert.ok(product.constructor.name === 'Product');
      done();
    });
  });
  it('Should search products', (done) => {
    nock(endpoint)
      .get('/products/search?page=2&query=searchQuery')
      .reply(200, productsFile);
    sa.products.search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, products) => {
      assert.ok(Array.isArray(products));
      assert.ok(products[0].constructor.name === 'Product');
      done();
    });
  });
});

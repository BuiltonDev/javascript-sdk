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
      .query({ size: 100, page: 0 })
      .reply(200, productsFile);
    sa.products.get({}, (err, products) => {
      assert.ok(Array.isArray(products.current));
      assert.ok(products.current[0].constructor.name === 'Product');
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
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/search')
      .query({ size, page, query: 'searchQuery' })
      .reply(200, productsFile);
    sa.products.search('searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });

  it('Should search subproducts for a product', (done) => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/:id:/sub_products/search')
      .query({ size, page, query: 'searchQuery' })
      .reply(200, productsFile);
    sa.products.searchSubProducts(':id:', 'searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should search subproducts', async () => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/:id:/sub_products/search')
      .query({ size, page, query: 'searchQuery' })
      .reply(200, productsFile);
    return sa.products.searchSubProducts(':id:', 'searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
    });
  });
});

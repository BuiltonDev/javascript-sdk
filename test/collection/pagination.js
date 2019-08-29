/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const productsFile = require('../fetchmock/products.json');
const productsFile2 = require('../fetchmock/products.2.json');

describe('Pagination related tests', () => {
  it('Should paginate', async () => {
    const mockRequest = (size, page) => {
      nock(endpoint)
        .get('/products')
        .query({ size, page })
        .reply(200, page % 2 === 0 ? productsFile : productsFile2, { 'X-Pagination-Total': 212 });
    };
    mockRequest(1, 0);
    const pagination1 = await sa.products.get({ size: 1, page: 0 });
    mockRequest(1, 1);
    assert(pagination1.current[0]._cls === 'Product');
    const page1Array = pagination1.current;
    await pagination1.next();
    const page2Array = pagination1.current;
    assert(page1Array[0].id !== page2Array[0].id);
    mockRequest(2, 0);
    const pagination2 = await sa.products.get({ size: 2, page: 0 });
    mockRequest(1, 2);
    await pagination1.next();
    assert(pagination1.page === 2);
    mockRequest(2, 1);
    await pagination2.next();
    mockRequest(1, 3);
    await pagination1.next();
    mockRequest(1, 2);
    await pagination1.previous();
    mockRequest(1, 3);
    const productsPageThree = await pagination1.goToPage(3);
    assert(productsPageThree === pagination1.current);
    assert(pagination1.page === 3);
    assert(pagination1.size === 1);
    assert(pagination1.current instanceof Object);
    assert(pagination1.current[0]._cls === 'Product');
    assert(pagination1.previous instanceof Function);
    assert(pagination1.next instanceof Function);
    assert(pagination1.paginationTotal === 212);
  });

  it('Should paginate with floor and ceil limit', async () => {
    const mockRequest = (size, page) => {
      nock(endpoint)
        .get('/products')
        .query({ page, size })
        .reply(200, page % 2 === 0 ? productsFile : productsFile2, { 'X-Pagination-Total': 212 });
    };
    mockRequest(3, 0);
    const pagination1 = await sa.products.get({ size: 3, page: 0 });
    const page1Array = pagination1.current;
    await pagination1.previous(); // returns page 0, not -1, without querying the API
    const page2Array = pagination1.current;
    assert(page1Array === page2Array);
    mockRequest(3, 1);
    await pagination1.next();
    const page3Array = pagination1.current;
    assert(page2Array !== page3Array);
    mockRequest(3, 212);
    await pagination1.goToPage(212); // go to last page
    const page4Array = pagination1.current;
    assert(page1Array !== page4Array);
    await pagination1.next(); // returns last page again, without querying the API
    const page5Array = pagination1.current;
    assert(page5Array === page4Array);
    mockRequest(3, 211);
    await pagination1.previous();
    const page6Array = pagination1.current;
    assert(page4Array !== page6Array);
  });

  it('Should paginate with callbacks', (done) => {
    const mockRequest = (size, page) => {
      nock(endpoint)
        .get('/products')
        .query({ size, page })
        .reply(200, page % 2 === 0 ? productsFile : productsFile2, { 'X-Pagination-Total': 212 });
    };
    mockRequest(1, 0);
    sa.products.get({ size: 1, page: 0 }, (error, pagination) => {
      let firstProductId = pagination.current[0].id;
      const paginateCallback = (err, obj) => {
        assert(err === null);
        assert(firstProductId !== obj[0].id);
        firstProductId = obj[0].id;
        if (pagination.page + 1 < 10) {
          mockRequest(1, pagination.page + 1);
          pagination.next(paginateCallback);
        } else {
          done();
        }
      };
      mockRequest(1, 1);
      pagination.next(paginateCallback);
    });
  });

  it('Should search subproducts with pagination', (done) => {
    const mockRequest = (size, page) => {
      nock(endpoint)
        .get('/products/:id:/sub_products/search')
        .query({ size, page, query: 'searchQuery' })
        .reply(200, page % 2 === 0 ? productsFile : productsFile2, { 'X-Pagination-Total': 212 });
    };
    const [page, size] = [2, 10];
    mockRequest(size, page);
    sa.products.searchSubProducts(':id:', 'searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      mockRequest(size, page + 1);
      const firstPageFirstId = productPage.current[0].id;
      productPage.next().then(() => {
        const secondPageFirstId = productPage.current[0].id;
        assert.ok(firstPageFirstId !== secondPageFirstId);
        mockRequest(size, page + 2);
        productPage.next().then(() => {
          assert.ok(productPage.page === page + 2);
          assert.ok(productPage.current !== secondPageFirstId);
          done();
        });
      });
    });
  });
});

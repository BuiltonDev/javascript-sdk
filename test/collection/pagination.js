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
    const pagination1 = await sa.products.paginate({ size: 1, page: 0 });
    mockRequest(1, 1);
    assert(pagination1.current[0]._cls === 'Product');
    const page1Array = pagination1.current;
    await pagination1.next();
    const page2Array = pagination1.current;
    assert(page1Array[0].id !== page2Array[0].id);
    mockRequest(2, 0);
    const pagination2 = await sa.products.paginate({ size: 2, page: 0 });
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

  it('Should paginate with callbacks', async () => {
    const mockRequest = (size, page) => {
      nock(endpoint)
        .get('/products')
        .query({ size, page })
        .reply(200, page % 2 === 0 ? productsFile : productsFile2, { 'X-Pagination-Total': 212 });
    };
    mockRequest(1, 0);
    sa.products.paginate({ size: 1, page: 0 }, (pagination) => {
      let firstProductId = pagination.current[0].id;
      const paginateCallback = (err, obj) => {
        assert(err === null);
        assert(firstProductId !== obj[0].id);
        firstProductId = obj[0].id;
        if (pagination.page + 1 < 10) {
          mockRequest(1, pagination.page + 1);
          pagination.next(paginateCallback);
        }
      };
      mockRequest(1, 1);
      pagination.next(paginateCallback);
    });
  });
});

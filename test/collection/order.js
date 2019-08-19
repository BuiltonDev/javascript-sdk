/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');

const paymentsFile = require('../fetchmock/payments.json');
const orderFile = require('../fetchmock/order.json');
const ordersFile = require('../fetchmock/orders.json');
const userFile = require('../fetchmock/user.json');
const orderPostBody = require('../fetchmock/orderPostBody.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

describe('Order related tests', () => {
  it('Should return a list of Orders', (done) => {
    nock(endpoint)
      .get('/orders')
      .query({ size: 100, page: 0 })
      .reply(200, ordersFile);
    sa.orders.get({}, (err, orders) => {
      if (err) throw err;
      assert.ok(Array.isArray(orders.current));
      done();
    });
  });

  it('Should return a list of Orders as json', (done) => {
    nock(endpoint)
      .get('/orders')
      .query({ size: 100, page: 0 })
      .reply(200, ordersFile);
    sa.orders.get({ json: true }, (err, orders) => {
      if (err) throw err;
      assert.ok(Array.isArray(orders.current));
      assert.ok(orders.current[0].constructor.name !== 'Order');
      done();
    });
  });

  it('Should set one Order', () => {
    const order = sa.orders.set('id1');
    assert.equal(order.id, 'id1');
  });

  it('Should set a list of Orders', () => {
    const orders = sa.orders.set(['id1', 'id2', 'id3']);
    assert.equal(orders[0].id, 'id1');
    assert.equal(orders[1].id, 'id2');
    assert.equal(orders[2].id, 'id3');
  });

  it('Should return an order', (done) => {
    nock(endpoint)
      .get('/orders/:orderId:')
      .reply(200, orderFile);
    sa.orders.set(':orderId:').get({}, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      assert.ok((order.human_id === 'Y8RDPJ'));
      done();
    });
  });

  it('Should update an order', (done) => {
    nock(endpoint)
      .put('/orders/:orderId:')
      .reply(200, orderFile);
    sa.orders.set(':orderId:').update({ body: { delivery_status: 'ACCEPTED' } }, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      assert.ok((order.human_id === 'Y8RDPJ'));
      done();
    });
  });

  it('Should post an order', (done) => {
    nock(endpoint)
      .post('/orders')
      .reply(200, orderFile);
    sa.orders.create(orderPostBody, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      assert.ok((order.human_id === 'Y8RDPJ'));
      done();
    });
  });

  it('Should return the user for an order', (done) => {
    nock(endpoint)
      .get('/orders/:orderId:')
      .reply(200, orderFile);
    sa.orders.set(':orderId:').get({}, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      nock(endpoint)
        .get('/users/591061fd8d95100013f0f3ca')
        .reply(200, userFile);
      sa.users.set(order.user).get({}, (err2, user) => {
        if (err2) throw err2;
        assert.ok(user.constructor.name === 'User');
        assert.ok((user.first_name === orderFile.user.first_name));
        done();
      });
    });
  });

  it('Should list payments of an order', (done) => {
    nock(endpoint)
      .get('/orders/:orderId:/payments')
      .query({ size: 100, page: 0 })
      .reply(200, paymentsFile);
    sa.orders.set(':orderId:').getPayments({}, (err, payments) => {
      if (err) throw err;
      assert.ok(payments.current[0].constructor.name === 'Payment');
      done();
    });
  });
});

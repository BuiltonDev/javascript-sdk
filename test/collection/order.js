/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const orderFile = require('../fetchmock/order.json');
const ordersFile = require('../fetchmock/orders.json');
const deliveryFile = require('../fetchmock/delivery.json');
const deliveriesFile = require('../fetchmock/deliveries.json');
const userFile = require('../fetchmock/user.json');
const orderPostBody = require('../fetchmock/orderPostBody.json');

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

describe('Order', () => {
  beforeEach(() => {
    // Guarantee each test knows exactly which routes are defined
    mock.clearRoutes();
  });

  it('Should return a list of Orders', (done) => {
    url = `${endpoint}orders`;
    mock.get(url, () => ({ body: ordersFile, ok: true }));
    sa.orders.get({}, (err, orders) => {
      if (err) throw err;
      assert.ok(Array.isArray(orders));
      done();
    });
  });

  it('Should return a list of Orders as json', (done) => {
    url = `${endpoint}orders`;
    mock.get(url, () => ({ body: ordersFile, ok: true }));
    sa.orders.get({ json: true }, (err, orders) => {
      if (err) throw err;
      assert.ok(Array.isArray(orders));
      url = `${endpoint}orders/${ordersFile[0]._id.$oid}`;
      assert.ok(orders[0].constructor.name !== 'Order');
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
    url = `${endpoint}orders/:orderId:`;
    mock.get(url, () => ({ body: orderFile, ok: true }));
    sa.orders.set(':orderId:').get({}, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      assert.ok((order.human_id === 'Y8RDPJ'));
      done();
    });
  });

  it('Should update an order', (done) => {
    url = `${endpoint}orders/:orderId:`;
    mock.put(url, () => ({ body: orderFile, ok: true }));
    sa.orders.set(':orderId:').update({ delivery_status: 'ACCEPTED' }, {}, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      assert.ok((order.human_id === 'Y8RDPJ'));
      done();
    });
  });

  it('Should post an order', (done) => {
    url = `${endpoint}orders`;
    mock.post(url, () => ({ body: orderFile, ok: true }));
    sa.orders.create(orderPostBody, {}, (err, order) => {
      if (err) throw err;
      assert.ok(order.constructor.name === 'Order');
      assert.ok((order.human_id === 'Y8RDPJ'));
      done();
    });
  });

  it('Should return a list of deliveries', (done) => {
    url = `${endpoint}orders/:orderId:/deliveries`;
    mock.get(url, () => ({ body: deliveriesFile, ok: true }));
    sa.orders.set(':orderId:').getDeliveries({}, (err, deliveries) => {
      if (err) throw err;
      assert.ok(Array.isArray(deliveries));
      assert.ok(deliveries[0].status === deliveriesFile[0].status);
      done();
    });
  });

  it('Should return the user for an order', (done) => {
    url = `${endpoint}orders/:orderId:`;
    mock.get(url, () => ({ body: orderFile, ok: true }));
    sa.orders.set(':orderId:').get({}, (err, order) => {
      if (err) throw err;
      url = `${endpoint}users/591061fd8d95100013f0f3ca`;
      assert.ok(order.constructor.name === 'Order');
      mock.get(url, () => ({ body: userFile, ok: true }));
      sa.users.set(order.user).get({}, (err2, user) => {
        if (err2) throw err2;
        assert.ok(user.constructor.name === 'User');
        assert.ok((user.first_name === orderFile.user.first_name));
        done();
      });
    });
  });

  it('Should submit a delivery', (done) => {
    url = `${endpoint}orders/:orderId:/deliveries/:deliveryId:`;
    mock.post(url, () => ({ body: deliveryFile, ok: true }));
    sa.orders.set(':orderId:').triggerDeliveryAction({}, { deliveryId: ':deliveryId:' }, (err, delivery) => {
      if (err) throw err;
      assert.ok(delivery.status === deliveryFile.status);
      done();
    });
  });

  it('Should submit a delivery', (done) => {
    url = `${endpoint}orders/:orderId:/deliveries/:deliveryId:`;
    mock.post(url, () => ({ body: deliveryFile, ok: true }));
    sa.orders.triggerDeliveryAction(':orderId:', {}, { deliveryId: ':deliveryId:' }, (err, delivery) => {
      if (err) throw err;
      assert.ok(delivery.status === deliveryFile.status);
      done();
    });
  });
});

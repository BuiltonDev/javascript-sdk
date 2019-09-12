const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const ordersFile = require('../fetchmock/orders.json');
const ratingFile = require('../fetchmock/ratings.json');
const userFile = require('../fetchmock/user.json');
const subscriptionsFile = require('../fetchmock/subscriptions.json');

describe('User related tests', () => {
  it('Should return a user', (done) => {
    nock(endpoint)
      .get('/users/:userId:')
      .reply(200, userFile);
    sa.users.set({ id: ':userId:' }).get({}, (err, user) => {
      assert.ok((user.first_name === userFile.first_name));
      assert.ok(user.constructor.name === 'User');
      done();
    });
  });
  it('Should return a user with a promise', (done) => {
    nock(endpoint)
      .get('/users/:userId:')
      .reply(200, userFile);
    sa.users.set(':userId:').get({}).then((user) => {
      assert.ok((user.first_name === userFile.first_name));
      assert.ok(user.constructor.name === 'User');
      done();
    }).catch(console.log);
  });
  it('Should return me', (done) => {
    nock(endpoint)
      .get('/users/me')
      .reply(200, userFile);
    sa.users.setMe().get({}, (err, userRes) => {
      assert.ok((userRes.first_name === userFile.first_name));
      assert.ok(userRes.constructor.name === 'User');
      done();
    });
  });
  it('Should return user from json user', (done) => {
    nock(endpoint)
      .get('/users/586fb30ee560270013f4f533')
      .reply(200, userFile);
    sa.users.set(userFile).get({}, (err, userRes) => {
      assert.ok((userRes.first_name === userFile.first_name));
      assert.ok(userRes.constructor.name === 'User');
      done();
    });
  });
  it('Should return a user ratings', (done) => {
    nock(endpoint)
      .get('/users/:userId:/ratings')
      .reply(200, ratingFile);
    sa.users.set({ id: ':userId:' }).getRating({}, (err, json) => {
      assert.ok(Array.isArray(json));
      done();
    });
  });
  it('Should get orders from me', (done) => {
    const [page, size] = [0, 100]; // defaults
    nock(endpoint)
      .get('/users/me/orders')
      .query({ size, page })
      .reply(200, ordersFile);
    sa.users.setMe().getOrders({}, (err, orderPage) => {
      assert.ok(Array.isArray(orderPage.current));
      assert.ok(orderPage.current[1].constructor.name === 'Order');
      done();
    });
  });
  it('Should get orders from user', (done) => {
    const [page, size] = [0, 100]; // defaults
    nock(endpoint)
      .get('/users/:userId:/orders')
      .query({ size, page })
      .reply(200, ordersFile);
    sa.users.set({ id: ':userId:' }).getOrders({}, (err, orderPage) => {
      assert.ok(Array.isArray(orderPage.current));
      assert.ok(orderPage.current[1].constructor.name === 'Order');
      done();
    });
  });
  it('Should get orders from user id', (done) => {
    const [page, size] = [0, 100]; // defaults
    nock(endpoint)
      .get('/users/:userId:/orders')
      .query({ size, page })
      .reply(200, ordersFile);
    sa.users.getOrders(':userId:', {}, (err, orderPage) => {
      assert.ok(Array.isArray(orderPage.current));
      assert.ok(orderPage.current[1].constructor.name === 'Order');
      done();
    });
  });
  it('Should get subscriptions from me', (done) => {
    const [page, size] = [0, 100]; // defaults
    nock(endpoint)
      .get('/users/me/subscriptions')
      .query({ size, page })
      .reply(200, subscriptionsFile);
    sa.users.setMe().getSubscriptions({}, (err, subscriptionPage) => {
      assert.ok(Array.isArray(subscriptionPage.current));
      assert.ok(subscriptionPage.current[0].constructor.name === 'Subscription');
      done();
    });
  });
});

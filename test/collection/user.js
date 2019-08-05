/* global it, describe, require */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const ordersFile = require('../fetchmock/orders.json');
const ratingFile = require('../fetchmock/ratings.json');
const userFile = require('../fetchmock/user.json');

describe('User related tests', () => {
  it('Should return a user', (done) => {
    url = `${endpoint}users/:userId:`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.users.set({ id: ':userId:' }).get({}, (err, user) => {
      assert.ok((user.first_name === userFile.first_name));
      assert.ok(user.constructor.name === 'User');
      done();
    });
  });
  it('Should return a user with a promise', (done) => {
    url = `${endpoint}users/:userId:`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.users.set(':userId:').get({}).then((user) => {
      assert.ok((user.first_name === userFile.first_name));
      assert.ok(user.constructor.name === 'User');
      done();
    }).catch(console.log);
  });
  let user;
  it('Should return me', (done) => {
    url = `${endpoint}users/me`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.users.setMe().get({}, (err, userRes) => {
      assert.ok((userRes.first_name === userFile.first_name));
      assert.ok(userRes.constructor.name === 'User');
      done();
    });
  });
  it('Should return user from json user', (done) => {
    url = `${endpoint}users/586fb30ee560270013f4f533`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.users.set(user).get({}, (err, userRes) => {
      assert.ok((userRes.first_name === userFile.first_name));
      assert.ok(userRes.constructor.name === 'User');
      done();
    });
  });
  it('Should return a user ratings', (done) => {
    url = `${endpoint}users/:userId:/ratings`;
    mock.get(url, () => ({ body: ratingFile, ok: true }));
    sa.users.set({ id: ':userId:' }).getRating({}, (err, json) => {
      assert.ok(Array.isArray(json));
      done();
    });
  });
  it('Should get orders from me', (done) => {
    url = `${endpoint}users/me/orders`;
    mock.get(url, () => ({ body: ordersFile, ok: true }));
    sa.users.setMe().getOrders({}, (err, orders) => {
      assert.ok(Array.isArray(orders));
      assert.ok(orders[1].constructor.name === 'Order');
      done();
    });
  });
  it('Should get orders from user', (done) => {
    url = `${endpoint}users/:userId:/orders`;
    mock.get(url, () => ({ body: ordersFile, ok: true }));
    sa.users.set({ id: ':userId:' }).getOrders({}, (err, orders) => {
      assert.ok(Array.isArray(orders));
      assert.ok(orders[1].constructor.name === 'Order');
      done();
    });
  });
});

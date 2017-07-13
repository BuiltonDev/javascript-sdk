/* global it, describe, require, console */
const Shareactor = require('../../src/main.js');
const assert = require('assert');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Shareactor({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const ordersFile = require('../fetchmock/orders.json');
const ratingFile = require('../fetchmock/ratings.json');
const userFile = require('../fetchmock/user.json');
const usersFile = require('../fetchmock/users.json');

describe('User related tests', () => {
  it('Should return a list of Users', (done) => {
    url = `${endpoint}users`;
    mock.get(url, () => ({ body: usersFile, ok: true }));
    sa.user().getAll({}, (err, users) => {
      assert.ok(Array.isArray(users));
      assert.ok(users[1].constructor.name === 'User');
      done();
    });
  });
  it('Should return a user', (done) => {
    url = `${endpoint}users/:userId:`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.user({ id: ':userId:' }).get({}, (err, user) => {
      assert.ok((user.first_name === userFile.first_name));
      assert.ok(user.constructor.name === 'User');
      done();
    });
  });
  let user;
  it('Should return me', (done) => {
    url = `${endpoint}users/me`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.user().get({}, (err, userRes) => {
      assert.ok((userRes.first_name === userFile.first_name));
      assert.ok(userRes.constructor.name === 'User');
      done();
    });
  });
  it('Should return user from json user', (done) => {
    url = `${endpoint}users/586fb30ee560270013f4f533`;
    mock.get(url, () => ({ body: userFile, ok: true }));
    sa.user(user).get({}, (err, userRes) => {
      assert.ok((userRes.first_name === userFile.first_name));
      assert.ok(userRes.constructor.name === 'User');
      done();
    });
  });
  it('Should return a user ratings', (done) => {
    url = `${endpoint}users/:userId:/ratings`;
    mock.get(url, () => ({ body: ratingFile, ok: true }));
    sa.user({ id: ':userId:' }).getRating({}, (err, json) => {
      assert.ok(Array.isArray(json));
      done();
    });
  });
  it('Should search users', (done) => {
    url = `${endpoint}users/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: usersFile, ok: true }));
    sa.user().search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, users) => {
      assert.ok(Array.isArray(users));
      assert.ok(users[1].constructor.name === 'User');
      done();
    });
  });
  it('Should get orders from me', (done) => {
    url = `${endpoint}users/me/orders`;
    mock.get(url, () => ({ body: ordersFile, ok: true }));
    sa.user().getOrders({}, (err, orders) => {
      assert.ok(Array.isArray(orders));
      assert.ok(orders[1].constructor.name === 'Order');
      done();
    });
  });
  it('Should get orders from user', (done) => {
    url = `${endpoint}users/:userId:/orders`;
    mock.get(url, () => ({ body: ordersFile, ok: true }));
    sa.user({ id: ':userId:' }).getOrders({}, (err, orders) => {
      assert.ok(Array.isArray(orders));
      assert.ok(orders[1].constructor.name === 'Order');
      done();
    });
  });
});
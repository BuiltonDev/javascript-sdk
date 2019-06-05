/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const subscriptionFile = require('../fetchmock/subscription.json');

describe('Subscription related tests', () => {
  it('Should return a subscription from a subscription id', (done) => {
    url = `${endpoint}subscriptions/:subscriptionId:`;
    mock.get(url, () => ({ body: subscriptionFile, ok: true }));
    sa.subscriptions.setOne(':subscriptionId:').get({}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });

  it('Should return start a subscription', (done) => {
    url = `${endpoint}subscriptions/:subscriptionId:/start`;
    mock.post(url, () => ({ body: subscriptionFile, ok: true }));
    sa.subscriptions.setOne(':subscriptionId:').start({
      body: {
        payment_method: 'dummy_payment_method',
        subscription_method: 'dummy_subscription_method',
      },
    }, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });

  it('Should return stop a subscription', (done) => {
    url = `${endpoint}subscriptions/:subscriptionId:/stop`;
    mock.post(url, () => ({ body: subscriptionFile, ok: true }));
    sa.subscriptions.setOne(':subscriptionId:').stop({}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });
});

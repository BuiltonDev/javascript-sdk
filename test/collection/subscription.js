/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Builton({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const subscriptionFile = require('../fetchmock/subscription.json');

describe('Subscription related tests', () => {
  it('Should return a subscription from a subscription id', (done) => {
    url = `${endpoint}subscriptions/:subscriptionId:`;
    mock.get(url, () => ({ body: subscriptionFile, ok: true }));
    sa.subscription(':subscriptionId:').get({}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });

  it('Should return start a subscription', (done) => {
    url = `${endpoint}subscriptions/:subscriptionId:/start`;
    mock.post(url, () => ({ body: subscriptionFile, ok: true }));
    sa.subscription(':subscriptionId:').start({
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
    sa.subscription(':subscriptionId:').stop({}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });
});

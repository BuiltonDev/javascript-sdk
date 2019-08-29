const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const subscriptionFile = require('../fetchmock/subscription.json');

describe('Subscription related tests', () => {
  it('Should return a subscription from a subscription id', (done) => {
    nock(endpoint)
      .get('/subscriptions/:subscriptionId:')
      .reply(200, subscriptionFile);
    sa.subscriptions.set(':subscriptionId:').get({}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });

  it('Should return start a subscription', (done) => {
    nock(endpoint)
      .post('/subscriptions/:subscriptionId:/start')
      .reply(200, subscriptionFile);
    sa.subscriptions.set(':subscriptionId:').start({
      payment_method: 'dummy_payment_method',
      subscription_method: 'dummy_subscription_method',
    }, {}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });

  it('Should return stop a subscription', (done) => {
    nock(endpoint)
      .post('/subscriptions/:subscriptionId:/stop')
      .reply(200, subscriptionFile);
    sa.subscriptions.set(':subscriptionId:').stop({}, {}, (err, subscription) => {
      assert.ok((subscription.name === subscriptionFile.name));
      assert.ok(subscription.constructor.name === 'Subscription');
      done();
    });
  });

  it('should update the payment method in subscription', async () => {
    nock(endpoint)
      .put('/subscriptions/:subscriptionId:')
      .reply(200, subscriptionFile);
    const updatedSubscription = await sa.subscriptions.set(':subscriptionId:').update({ payment_method: '<payment-method-id>' });
    assert.ok(updatedSubscription.payment_method.$oid === '<payment-method-id>');
  });
});

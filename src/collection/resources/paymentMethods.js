/* eslint-disable max-classes-per-file */
const Components = require('./_resources');
const PaymentMethod = require('../objects/paymentMethod');
const StripePaymentProvider = require('../../functionality/paymentProvider/stripe');
const VippsPaymentProvider = require('../../functionality/paymentProvider/vipps');
const {
  create,
  del,
  update,
  getFromId,
  getAll,
  get,
  set,
} = require('./_methods')(PaymentMethod);

class PaymentMethods extends Components {
  constructor(request) {
    super([create, del, update, getFromId, getAll, get, set]);
    this.request = request;
    this.apiPath = 'payment_methods';
    this.ResConstructor = PaymentMethod;
    this.StripePaymentProvider = StripePaymentProvider;
    this.VippsPaymentProvider = VippsPaymentProvider;
  }

  createWithProvider(provider, { urlParams, json = false } = {}, done) {
    const createWithStripe = (stripe, cardElement) => this.create({
      payment_method: 'stripe',
    }).then((holderPaymentMethod) => stripe.handleCardSetup(
      holderPaymentMethod.setup_intent.client_secret,
      cardElement,
    ).then((stripeResponse) => holderPaymentMethod.update({
      payment_method_id: stripeResponse.setupIntent.payment_method,
    }, { urlParams, json }, done)));
    const createWithVipps = () => this.create({
      payment_method: 'vipps',
    });
    switch (provider.name) {
      case 'StripePaymentProvider':
        if (provider.stripe && provider.element) {
          return createWithStripe(provider.stripe, provider.element);
        }
        break;
      case 'VippsPaymentProvider':
        return createWithVipps();
      default:
        throw Error('error');
    }
  }
}

module.exports = PaymentMethods;

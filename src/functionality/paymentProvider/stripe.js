class StripePaymentProvider {
  constructor(stripe, element) {
    this.name = 'StripePaymentProvider';
    this.stripe = stripe;
    this.element = element;
  }
}

module.exports = StripePaymentProvider;

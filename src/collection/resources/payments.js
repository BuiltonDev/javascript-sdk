const Components = require('./_resources');
const Payment = require('../objects/payment');
const Error = require('../../utils/error');
const {
  create,
  getFromId,
  getAll,
  get,
  set,
  search,
} = require('./_methods')(Payment);

class Payments extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, set, search]);
    this.request = request;
    this.apiPath = 'payments';
    this.ResConstructor = Payment;
  }

  createWithProvider(provider, body, { urlParams, json = false } = {}, done) {
    const createWithStripe = (stripe) => this.create(
      body,
    )
      .catch((createError) => {
        if (createError.status === 422) {
          const payments = createError.response.body;
          const paymentList = [];
          return new Promise((resolve) => {
            let result = Promise.resolve();
            payments.forEach((payment) => {
              if (
                payment.current_state
                && payment.current_state.toUpperCase() === 'PENDING'
                && payment.metadata
                && payment.metadata.intent_client_secret
                && payment.metadata.intent_id
              ) {
                result = result
                  .then(() => stripe.handleCardAction(payment.metadata.intent_client_secret))
                  .catch((error) => { throw new Error.StripeError(error); })
                  .then((stripeResponse) => {
                    if (stripeResponse.error) {
                      throw new Error.StripeError(stripeResponse.error);
                    }
                    // eslint-disable-next-line camelcase
                    const { id, client_secret } = stripeResponse.paymentIntent;
                    return this.confirm(payment._id.$oid, {
                      payment_intent_id: id,
                      payment_client_secret: client_secret,
                    }, { urlParams, json }, done);
                  })
                  .then((SCAPayment) => {
                    paymentList.push(new Payment(this.request, SCAPayment));
                  })
                  .catch((error) => {
                    paymentList.push(new Payment(this.request, {
                      ...payment,
                      error,
                    }));
                  });
              } else {
                result = result.then(() => paymentList.push(new Payment(this.request, payment)));
              }
            });
            result.then(() => resolve(paymentList));
          });
        }
      });

    switch (provider.name) {
      case 'StripePaymentProvider':
        if (provider.stripe && provider.element) {
          return createWithStripe(provider.stripe, provider.element);
        }
        break;
      case 'VippsPaymentProvider':
        return create(body, { json }, done);
      default:
        throw Error('error');
    }
  }

  pay(id, ...params) {
    const obj = new Payment(this.request, id);
    return obj.pay(...params);
  }

  // Confirm the payment due to SCA triggered
  confirm(id, ...params) {
    const obj = new Payment(this.request, id);
    return obj.confirm(...params);
  }
}

module.exports = Payments;

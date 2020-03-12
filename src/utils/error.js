/* eslint-disable max-classes-per-file */
class ExtendableError extends Error {
  constructor(message, metadata) {
    super();
    this.message = message;
    this.name = this.constructor.name;
    Object.entries(metadata).forEach(([key, value]) => {
      if (!this[key]) {
        this[key] = value;
      }
    });
  }
}

class MethodNeedsId extends ExtendableError {
  constructor() {
    super('You need to construct this object with an ID to access that method');
  }
}

class MethodNeedsArg extends ExtendableError {
  constructor(arg) {
    super(`This method requires the argument "${arg}" to be executed`);
  }
}

class NotImplemented extends ExtendableError {
  constructor() {
    super('This method is not implemented for this Object');
  }
}

class AbstractClass extends ExtendableError {
  constructor() {
    super('Cannot construct Abstract instances');
  }
}

class BadRequest extends ExtendableError {
  constructor(requestError) {
    super(requestError.response.body.message || 'Bad request', requestError);
  }
}

class StripeError extends ExtendableError {
  constructor(stripeError) {
    super(stripeError.message || 'Payment error', stripeError);
  }
}

class ImageUpload extends ExtendableError {
  constructor() {
    super('Data needs to be an object { buffer: Buffer, filename: String } or an instance File(client).');
  }
}

class UnknownPaymentProvider extends ExtendableError {
  constructor() {
    super('This payment method name doesn\'t exist');
  }
}

module.exports = {
  MethodNeedsId,
  AbstractClass,
  MethodNeedsArg,
  NotImplemented,
  BadRequest,
  StripeError,
  ImageUpload,
  UnknownPaymentProvider,
};

/* eslint-disable max-classes-per-file */
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = this.constructor.name;
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

class ImageUpload extends ExtendableError {
  constructor() {
    super('Data needs to be an object { buffer: Buffer, filename: String } or an instance File(client).');
  }
}

module.exports = {
  MethodNeedsId,
  AbstractClass,
  MethodNeedsArg,
  NotImplemented,
  ImageUpload,
};

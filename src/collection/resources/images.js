const FormData = require('form-data');
const Components = require('./_resources');
const Image = require('../objects/image');

class Images extends Components {
  constructor(request) {
    super();
    this.request = request;
    this.apiPath = 'images';
    this.ResConstructor = Image;
  }

  create({ imageData, isPublic, urlParams } = {}, done) {
    let form = new FormData();
    form.append('image', imageData);
    if (isPublic !== undefined) {
      form.append('public', isPublic);
    }
    // eslint-disable-next-line eqeqeq, no-restricted-globals
    if (typeof self != 'object') { // if polyfill is used, (https://github.com/form-data/form-data/blob/master/lib/browser.js)
      form = JSON.stringify(form); // We stringify as superagent will not do it.
    }
    return this.query({
      type: 'post',
      body: form,
      urlParams,
      isJsonBody: false,
    }, done);
  }
}

module.exports = Images;

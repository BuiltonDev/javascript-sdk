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
    const form = new FormData();
    form.append('image', imageData);
    if (isPublic !== undefined) {
      form.append('public', isPublic);
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

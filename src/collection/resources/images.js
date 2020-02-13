const Components = require('./_resources');
const Image = require('../objects/image');
const Error = require('../../utils/error');

class Images extends Components {
  constructor(request) {
    super();
    this.request = request;
    this.apiPath = 'images';
    this.ResConstructor = Image;
  }

  async create(data, { isPublic, urlParams } = {}, done) {
    const imageName = data.filename || data.name || `image-${Date.now()}`;

    if ((!Buffer && typeof File === 'undefined')
      || (typeof data !== 'object')
      || (!Buffer.isBuffer(data.buffer) && !(data instanceof File))
    ) {
      return Promise.reject(new Error.ImageUpload());
    }

    return this.query({
      type: 'post',
      body: {
        isFile: true,
        data: data.buffer || data,
        filename: imageName,
        isPublic,
      },
      urlParams,
    }, done);
  }
}

module.exports = Images;

const Components = require('./_resources');
const Image = require('../objects/image');

class Images extends Components {
  constructor(request) {
    super();
    this.request = request;
    this.apiPath = 'images';
    this.ResConstructor = Image;
  }

  async create(data, { isPublic, urlParams } = {}, done) {
    const imageName = data.filename || data.name || `image-${new Date().now}`;

    if ((!Buffer && typeof File === 'undefined')
      || (typeof data !== 'object')
      || (!Buffer.isBuffer(data.buffer) && !(data instanceof File))
    ) {
      return Promise.reject(new Error('Data needs to be an object { buffer: Buffer, filename: String } or an instance File(client).'));
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

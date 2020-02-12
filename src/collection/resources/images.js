const Components = require('./_resources');
const Image = require('../objects/image');

class Images extends Components {
  constructor(request) {
    super();
    this.request = request;
    this.apiPath = 'images';
    this.ResConstructor = Image;
  }

  async create({ data, filename }, { isPublic, urlParams } = {}, done) {
    let imageName = filename;
    if ((!Buffer && typeof File === 'undefined') || (!Buffer.isBuffer(data) && !(data instanceof File))) {
      return Promise.reject(new Error('Data needs to be instance of Buffer(node) or File(client).'));
    }

    if (typeof File !== 'undefined' && !filename && (data instanceof File)) {
      imageName = filename || data.name;
    }

    return this.query({
      type: 'post',
      body: {
        isFile: true,
        data,
        filename: imageName,
        isPublic,
      },
      urlParams,
    }, done);
  }
}

module.exports = Images;

const assert = require('assert');
const fs = require('fs');
const nock = require('nock');
const Builton = require('../../src/main.js');

const imageFile = require('../fetchmock/image.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

describe('Image related tests', () => {
  it('Should create an image from public url', async () => {
    nock(endpoint)
      .post('/images')
      .reply(200, imageFile);
    try {
      const image = await sa.images.create({ public_url: 'https://d1vk7rtgnzzicy.cloudfront.net/5d2853e0f93362000d0ff267/1x1.png', original_name: '1x1.png' });
      assert.equal(image.public_url, 'https://d1vk7rtgnzzicy.cloudfront.net/5d2853e0f93362000d0ff267/1x1.png');
      assert.equal(image.original_name, '1x1.png');
    } catch (err) {
      assert.fail(err);
      console.error(err);
    }
  });
  it('Should upload an image', async () => {
    nock(endpoint)
      .post('/images')
      .reply(200, imageFile);
    try {
      fs.readFile(`${__dirname}/../fetchmock/1x1.png`, async (err, data) => {
        const image = await sa.images.create({ data, filename: '1x1.png' });
        assert.equal(image.original_name, '1x1.png');
      });
    } catch (err) {
      assert.fail(err);
      console.error(err);
    }
  });
});

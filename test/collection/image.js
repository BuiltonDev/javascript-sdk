/* global it, describe, require */
const assert = require('assert');
const fs = require('fs');
const Builton = require('../../src/main.js');

const nock = require('nock');

const imageFile = require('../fetchmock/image.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

describe('Image related tests', () => {
  it.skip('Should upload an image', async () => {
    nock(endpoint)
      .post('/images')
      .reply(200, imageFile);
    const imageData = fs.createReadStream('../fetchmock/1x1.png');
    try {
      const image = await sa.images.create({ imageData });
      assert.equal(image.original_name, '1x1.png');
    } catch (err) {
      console.error(err);
    }
  });
});

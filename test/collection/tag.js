/* global it, describe, require */
const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const tagFile = require('../fetchmock/tags.json');

describe('Tag related tests', () => {
  it('Should return all the tags', (done) => {
    nock(endpoint)
      .get('/tags')
      .reply(200, tagFile);
    sa.tags.get({}, (err, tags) => {
      assert.ok(Array.isArray(tags));
      assert.ok(tagFile[2]._id.$oid === tags[2].id);
      done();
    });
  });
});

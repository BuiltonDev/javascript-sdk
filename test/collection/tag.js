/* global it, describe, require, console */
const assert = require('assert');
const Kvass = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Kvass({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const tagFile = require('../fetchmock/tags.json');

describe('Tag related tests', () => {
  it('Should return all the tags', (done) => {
    url = `${endpoint}tags`;
    mock.get(url, () => ({ body: tagFile, ok: true }));
    sa.tag().getAll({}, (err, tags) => {
      assert.ok(Array.isArray(tags));
      assert.ok(tagFile[2]._id.$oid === tags[2].id);
      done();
    });
  });
});

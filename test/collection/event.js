/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const eventsFile = require('../fetchmock/events.json');

describe('Events related tests', () => {
  it('Should search users', (done) => {
    url = `${endpoint}events/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: eventsFile, ok: true }));
    sa.events.search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, events) => {
      assert.ok(Array.isArray(events));
      assert.ok(events[0].constructor.name === 'Event');
      done();
    });
  });
});

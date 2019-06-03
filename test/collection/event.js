/* global it, describe, require, console */
const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Builton({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

const eventsFile = require('../fetchmock/events.json');

describe('Events related tests', () => {
  it('Should search users', (done) => {
    url = `${endpoint}events/search?page=2&query=searchQuery`;
    mock.get(url, () => ({ body: eventsFile, ok: true }));
    sa.event().search({ query: 'searchQuery', urlParams: { page: 2 } }, (err, events) => {
      assert.ok(Array.isArray(events));
      assert.ok(events[0].constructor.name === 'Event');
      done();
    });
  });
});

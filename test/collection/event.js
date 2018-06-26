/* global it, describe, require, console */
const Kvass = require('../../src/main.js');
const assert = require('assert');

const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const sa = new Kvass({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
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

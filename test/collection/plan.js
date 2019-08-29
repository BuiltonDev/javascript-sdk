const assert = require('assert');
const Builton = require('../../src/main.js');

const request = require('superagent');
const mock = require('superagent-mocker')(request);

const endpoint = 'https://example.com/';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });
let url;

const plansFile = require('../fetchmock/plans.json');

describe('Plan', () => {
  it('Should return all the plans', (done) => {
    url = `${endpoint}plans/${plansFile[0]._id.$oid}`;
    mock.get(url, () => ({ body: plansFile, ok: true }));
    sa.plans.set(plansFile[0]).get({}, (err, plans) => {
      assert.ok(Array.isArray(plans));
      assert.ok(plansFile[0]._id.$oid === plans[0].id);
      done();
    });
  });
});

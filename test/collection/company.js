/* global it, describe, require, console */
global.test = true;
const Shareactor = require('../../src/main.js');
const assert = require('assert');
const request = require('../../src/utils/superagent');
const mock = require('superagent-mocker')(request);

const companyFile = require('../fetchmock/company.json');
const companyPropertiesFile = require('../fetchmock/companyProperties.json');

const endpoint = 'https://example.com/';
const sa = new Shareactor({ apiKey: 'dummy', bearerToken: 'dummy', endpoint });
let url;

mock.timeout = 100;

describe('Company related tests', () => {
  beforeEach(() => {
    // Guarantee each test knows exactly which routes are defined
    mock.clearRoutes();
  });

  it('Should return the current Company', (done) => {
    url = `${endpoint}companies`;
    mock.get(url, () => ({ body: companyFile, ok: true }));
    sa.company().get({}, (err, company) => {
      assert.ok(companyFile._id.$oid === company._id.$oid);
      assert.ok(company.constructor.name === 'Company');
      done();
    });
  });

  it('Should return properties of the current Company', (done) => {
    url = `${endpoint}companies/properties`;
    mock.get(url, () => ({ body: companyPropertiesFile, ok: true }));
    sa.company().getProperties({}, (err, companyProperties) => {
      assert.ok(companyPropertiesFile.delivery_automatic_under.value
        === companyProperties.delivery_automatic_under.value);
      done();
    });
  });
});
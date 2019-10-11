global.test = true;
const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');
const companyPropertiesFile = require('../fetchmock/companyProperties.json');

const endpoint = 'https://example.com';
const sa = new Builton({ apiKey: 'dummy', endpoint });

describe('Company', () => {
  it('Should return properties of the current Company', (done) => {
    nock(endpoint)
      .get('/companies/properties')
      .reply(200, companyPropertiesFile);
    sa.company.getProperties({}, (err, companyProperties) => {
      assert.ok(companyPropertiesFile.delivery_automatic_under.value
        === companyProperties.delivery_automatic_under.value);
      done();
    });
  });
});

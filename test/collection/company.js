global.test = true;
const assert = require('assert');
const Builton = require('../../src/main.js');

const nock = require('nock');

const companyFile = require('../fetchmock/company.json');
const companyPropertiesFile = require('../fetchmock/companyProperties.json');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', endpoint });

describe('Company', () => {
  it('Should return the current Company / without bearerToken', (done) => {
    nock(endpoint)
      .get('/companies')
      .reply(200, companyFile);
    sa.company.get({}, (err, company) => {
      assert.ok(companyFile._id.$oid === company._id.$oid);
      done();
    });
  });

  it('Should return the current Company / with bearerToken', (done) => {
    nock(endpoint)
      .get('/companies')
      .reply(200, companyFile);
    sa.refreshBearerToken(bearerToken);
    sa.company.get({}, (err, company) => {
      assert.ok(companyFile._id.$oid === company._id.$oid);
      done();
    });
  });

  it('Should return the current Company / without bearerToken 2', (done) => {
    nock(endpoint)
      .get('/companies')
      .reply(200, companyFile);
    sa.refreshBearerToken(undefined);
    sa.company.get({}, (err, company) => {
      assert.ok(companyFile._id.$oid === company._id.$oid);
      sa.refreshBearerToken(bearerToken);
      done();
    });
  });

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

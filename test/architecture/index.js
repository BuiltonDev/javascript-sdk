const assert = require('assert');

const AiModels = require('../../src/collection/resources/aiModels');
const AiModel = require('../../src/collection/objects/aiModel');

const Company = require('../../src/collection/resources/company');

const Images = require('../../src/collection/resources/images');
const Image = require('../../src/collection/objects/image');

const Orders = require('../../src/collection/resources/orders');
const Order = require('../../src/collection/objects/order');

const Payments = require('../../src/collection/resources/payments');
const Payment = require('../../src/collection/objects/payment');

const PaymentMethods = require('../../src/collection/resources/paymentMethods');
const PaymentMethod = require('../../src/collection/objects/paymentMethod');

const Plans = require('../../src/collection/resources/plans');
const Plan = require('../../src/collection/objects/plan');

const Products = require('../../src/collection/resources/products');
const Product = require('../../src/collection/objects/product');

const Resources = require('../../src/collection/resources/resources');
const Resource = require('../../src/collection/objects/resource');

const Subscriptions = require('../../src/collection/resources/subscriptions');
const Subscription = require('../../src/collection/objects/subscription');

const Tags = require('../../src/collection/resources/tags');
const Tag = require('../../src/collection/objects/tag');

const Users = require('../../src/collection/resources/users');
const User = require('../../src/collection/objects/user');

const architectureFile = require('./architecture.json');

function getClassMethods(obj) {
  const array = [];
  const ignoreList = [
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',

    'paginate',
    'query',
    'ResConstructor',
  ];
  let names = Object.getOwnPropertyNames(obj);
  names.forEach((name) => {
    if (!ignoreList.includes(name) && typeof obj[name] === 'function') {
      array.push(name);
    }
  });
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    names = Object.getOwnPropertyNames(proto);
    names.forEach((name) => {
      if (!ignoreList.includes(name) && typeof obj[name] === 'function') {
        array.push(name);
      }
    });
    proto = Object.getPrototypeOf(proto);
  }
  return array;
}


const checkMatchingModels = (res, object) => {
  getClassMethods(object).forEach((prop) => {
    if (typeof object[prop] === 'function' && prop !== 'refresh') {
      if (typeof object[prop] !== typeof res[prop]) {
        console.error(prop, typeof object[prop], typeof res[prop]);
      }
      assert(typeof object[prop] === typeof res[prop]);
    }
  });
};

const areArraysEqual = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr2.indexOf(arr1[i]) === -1) {
      return false;
    }
  }
  return true;
};

const checkArchitectureMatchesJsonFile = (id, res, object) => {
  const model = architectureFile[id];

  const objectFunctions = model.object.roles.user;
  const resourceFunctions = model.resource.roles.user;

  // We compare the actual function list with the expected function list.
  assert(areArraysEqual(getClassMethods(object).sort(), objectFunctions.sort()));
  assert(areArraysEqual(
    getClassMethods(res).sort(), resourceFunctions.concat(objectFunctions).sort(),
  ));

  // We make sure no function is undefined.
  objectFunctions.forEach((fn) => {
    assert(object[fn] !== undefined);
    // Object functions should be accessible from the resource equivalent object.
    assert(fn === 'refresh' || res[fn] !== undefined);
  });
  resourceFunctions.forEach((fn) => {
    assert(res[fn] !== undefined);
  });
};

describe.only('Architectural tests', () => {
  it('Should check architecture file correspong for AiModel', (done) => {
    checkArchitectureMatchesJsonFile('AiModel', new AiModels(), new AiModel());
    done();
  });
  it('Should match AiModel resource and object', (done) => {
    checkMatchingModels(new AiModels(), new AiModel());
    done();
  });
  it('Should check architecture file correspong for Company', (done) => {
    const model = architectureFile.Company;
    const resourceFunctions = model.resource.roles.user;
    const company = new Company();
    assert(areArraysEqual(
      getClassMethods(company).sort(), resourceFunctions.sort(),
    ));
    resourceFunctions.forEach((fn) => {
      assert(company[fn] !== undefined);
    });
    done();
  });
  it('Should check architecture file correspong for Image', (done) => {
    checkArchitectureMatchesJsonFile('Image', new Images(), new Image());
    done();
  });
  it('Should match image resource and object', (done) => {
    checkMatchingModels(new Images(), new Image());
    done();
  });
  it('Should check architecture file correspong for Order', (done) => {
    checkArchitectureMatchesJsonFile('Order', new Orders(), new Order());
    done();
  });
  it('Should match order resource and object', (done) => {
    checkMatchingModels(new Orders(), new Order());
    done();
  });
  it('Should check architecture file correspong for Payment', (done) => {
    checkArchitectureMatchesJsonFile('Payment', new Payments(), new Payment());
    done();
  });
  it('Should match payment resource and object', (done) => {
    checkMatchingModels(new Payments(), new Payment());
    done();
  });
  it('Should check architecture file correspong for PaymentMethod', (done) => {
    checkArchitectureMatchesJsonFile('PaymentMethod', new PaymentMethods(), new PaymentMethod());
    done();
  });
  it('Should match paymentMethod resource and object', (done) => {
    checkMatchingModels(new PaymentMethods(), new PaymentMethod());
    done();
  });
  it('Should check architecture file correspong for Plan', (done) => {
    checkArchitectureMatchesJsonFile('Plan', new Plans(), new Plan());
    done();
  });
  it('Should match plan resource and object', (done) => {
    checkMatchingModels(new Plans(), new Plan());
    done();
  });
  it('Should check architecture file correspong for Product', (done) => {
    checkArchitectureMatchesJsonFile('Product', new Products(), new Product());
    done();
  });
  it('Should match product resource and object', (done) => {
    checkMatchingModels(new Products(), new Product());
    done();
  });
  it('Should check architecture file correspong for Resource', (done) => {
    checkArchitectureMatchesJsonFile('Resource', new Resources(), new Resource());
    done();
  });
  it('Should match "resource" resource and object', (done) => {
    checkMatchingModels(new Resources(), new Resource());
    done();
  });
  it('Should check architecture file correspong for Subscription', (done) => {
    checkArchitectureMatchesJsonFile('Subscription', new Subscriptions(), new Subscription());
    done();
  });
  it('Should match subscription resource and object', (done) => {
    checkMatchingModels(new Subscriptions(), new Subscription());
    done();
  });
  it('Should check architecture file correspong for Tag', (done) => {
    checkArchitectureMatchesJsonFile('Tag', new Tags(), new Tag());
    done();
  });
  it('Should match tag resource and object', (done) => {
    checkMatchingModels(new Tags(), new Tag());
    done();
  });
  it('Should check architecture file correspong for User', (done) => {
    checkArchitectureMatchesJsonFile('User', new Users(), new User());
    done();
  });
  it('Should match user resource and object', (done) => {
    checkMatchingModels(new Users(), new User());
    done();
  });
});

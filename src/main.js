const request = require('./utils/request');

const Order = require('./collection/order');
const Product = require('./collection/product');
const Provider = require('./collection/provider');
const Tag = require('./collection/tag');
const User = require('./collection/user');
const Company = require('./collection/company');
const Payment = require('./collection/payment');
const PaymentMethod = require('./collection/paymentMethod');

class ShareActor {
  constructor({ apiKey, bearerToken, endpoint }) {
    request(endpoint, {
      'X-Share-API-Key': apiKey,
      authorization: `Bearer ${bearerToken}`,
    });

    this.product = props => new Product(props);
    this.provider = props => new Provider(props);
    this.user = props => new User(props);
    this.order = props => new Order(props);
    this.tag = props => new Tag(props);
    this.company = props => new Company(props);
    this.payment = props => new Payment(props);
    this.paymentMethod = props => new PaymentMethod(props);
  }
}

module.exports = ShareActor;

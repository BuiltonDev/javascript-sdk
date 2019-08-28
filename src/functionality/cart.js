const store = require('store2');
const Orders = require('../collection/resources/orders');
const Order = require('../collection/objects/order');

class Cart {
  constructor(request) {
    this._cart = store.get('cart') || [];
    this.request = request;
  }

  _findProductIndex(productId) {
    return this._cart.findIndex(cartItem => cartItem.productId === productId);
  }

  _isCartValid() {
    this._cart.forEach((item) => {
      if (Object.keys(item).length !== 2 || !item.productId || !item.quantity) {
        return false;
      }
    });
    return true;
  }

  _saveCart() {
    store.set('cart', this._cart);
  }

  set(newCart) {
    this._cart = newCart;
  }

  get() {
    return this._cart;
  }

  empty() {
    this._cart = [];
  }

  addProduct({ productId, quantity = 1, subProducts = [] }) {
    const exisitingProduct = this._findProductIndex(productId);
    // If product item exists, we replace with new product item
    if (exisitingProduct > -1) {
      this._cart[exisitingProduct] = { productId, quantity, subProducts };
    } else {
      this._cart.push({ productId, quantity, subProducts });
    }
    this._saveCart();
    return this._cart;
  }

  removeProduct(productId) {
    const exisitingProduct = this._findProductIndex(productId);
    if (exisitingProduct > -1) {
      this._cart.splice(exisitingProduct, 1);
    }
    this._saveCart();
    return this._cart;
  }

  addSubproduct(subProductId, productId) {
    const exisitingProduct = this._findProductIndex(productId);
    if (exisitingProduct < 0) return new Error('Product is not in cart');

    this._cart[exisitingProduct].subProducts.push(subProductId);
    return this._cart;
  }

  removeSubproduct(subProductId, productId) {
    const exisitingProduct = this._findProductIndex(productId);
    if (exisitingProduct < 0) return new Error('Product is not in cart');

    const subProductIndex = this._cart[exisitingProduct].subProducts.indexOf(subProductId);
    this._cart[exisitingProduct].subProducts.splice(subProductIndex, 1);
    return this._cart;
  }

  // Give orderId only if checkout failed during pay due to SCA
  checkout(paymentMethodId, deliveryAddress, resumeOrderId) {
    if (!this._isCartValid()) throw new Error('Cart not valid');

    const items = this._cart.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      sub_products: item.subProducts,
    }));

    const payForOrder = order => order.pay({
      body: {
        payment_method: paymentMethodId,
      },
    }).then((completedOrder) => {
      this.empty();
      this._saveCart();
      return completedOrder;
    });

    if (resumeOrderId) {
      return payForOrder(new Order(this.request, { id: resumeOrderId }));
    }

    return new Orders(this.request).create({
      body: {
        items,
        delivery_address: deliveryAddress,
      },
    }).then(newOrder => payForOrder(newOrder));
  }
}

module.exports = Cart;

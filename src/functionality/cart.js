const store = require('store2');
const Orders = require('../collection/resources/orders');

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
      if (Object.keys(item).length !== 2 || !item.productId || item.quantity) {
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

  addProduct({ productId, quantity }) {
    const exisitingProduct = this._findProductIndex(productId);
    // If product item exists, we replace with new product item
    if (exisitingProduct > -1) {
      this._cart[exisitingProduct] = { productId, quantity };
    } else {
      this._cart.push({ productId, quantity });
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

  // User should be authenticated before triggering this step
  checkout(paymentMethodId, deliveryAddress) {
    if (!this._isCartValid()) throw new Error('Cart not valid');

    return new Orders(this.request).create({
      body: {
        items: this._cart,
        delivery_address: deliveryAddress,
      },
    }).then((createdOrder) => {
      return createdOrder.pay({
        body: {
          payment_method: paymentMethodId,
        },
      }).then((order) => {
        this.empty();
        this._saveCart();
        return order;
      });
    });
  }
}

module.exports = Cart;

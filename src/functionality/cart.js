const store = require('store2');
const Orders = require('../collection/resources/orders');
const Order = require('../collection/objects/order');
const Payments = require('../collection/resources/payments');

class Cart {
  constructor(request) {
    this._cart = store.get('cart') || [];
    this.request = request;
  }

  _findProductIndex(productId) {
    return this._cart.findIndex((cartItem) => cartItem.productId === productId);
  }

  // Cart is valid if all item contain at least productId and quantity
  _isCartValid() {
    return !this._cart.some((item) => (!item.productId || !item.quantity));
  }

  _saveCart() {
    store.set('cart', this._cart);
  }

  // Check to see if two subproduct lists contain the same items. Doesn't care about order
  static _compareSubproducts(listA = [], listB = []) {
    if (!listA.length && !listB.length) return true;
    return listA.slice(0).sort().join('-') === listB.slice(0).sort().join('-');
  }

  set(newCart) {
    this._cart = newCart;
    this._saveCart();
  }

  get() {
    return this._cart;
  }

  empty() {
    this._cart = [];
    this._saveCart();
  }

  /* Add product. If product AND subproduct combination exists,
     we increment with provided quantity, otherwise it is
     added as another line in the cart */
  addProduct({ productId, quantity = 1, subProducts = [] }) {
    const index = this._findProductIndex(productId);

    if (index > -1) {
      if (Cart._compareSubproducts(this._cart[index].subProducts, subProducts)) {
        this._cart[index].quantity += quantity;
      } else {
        this._cart.push({ productId, quantity, subProducts });
      }
    } else {
      this._cart.push({ productId, quantity, subProducts });
    }

    this._saveCart();
    return this._cart;
  }

  /* Remove product. If product has more than provided quantity,
     we just decrement by the provided quantity, otherwise we
     remove the entire line */
  removeProduct({ productId, quantity = 1 }) {
    const index = this._findProductIndex(productId);

    if (index > -1) {
      if (this._cart[index].quantity <= quantity) {
        this._cart.splice(index, 1);
      } else {
        this._cart[index].quantity -= quantity;
      }
    }

    this._saveCart();
    return this._cart;
  }

  addSubproduct(subProductId, productId, increaseQuantity = false) {
    const index = this._findProductIndex(productId);
    if (index < 0) return new Error('Product is not in cart');

    this._cart[index].subProducts.push(subProductId);
    // In case the sub product should be counted as separate product in the order
    // we need to increase the quantity
    if (increaseQuantity) {
      this._cart[index].quantity += 1;
    }
    this._saveCart();
    return this._cart;
  }

  removeSubproduct(subProductId, productId, decreaseQuantity = false) {
    const index = this._findProductIndex(productId);
    if (index < 0) return new Error('Product is not in cart');

    const subProductIndex = this._cart[index].subProducts.indexOf(subProductId);
    this._cart[index].subProducts.splice(subProductIndex, 1);
    // In case the sub product should be counted as separate product in the order
    // we need to increase/decrease the quantity
    if (decreaseQuantity) {
      this._cart[index].quantity -= 1;
    }
    this._saveCart();
    return this._cart;
  }

  // Give orderId only if checkout failed during pay due to SCA
  checkout(paymentMethodId, deliveryAddress, resumeOrderId) {
    if (!this._isCartValid()) throw new Error('Cart not valid');
    if (!paymentMethodId) throw new Error('Missing payment method');

    const items = this._cart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      sub_products: item.subProducts,
    }));

    const payForOrder = (order) => new Payments(this.request).create({
      orders: [order.id],
      payment_method: paymentMethodId,
    }).then((payment) => {
      this.empty();
      return payment;
    });

    if (resumeOrderId) {
      return payForOrder(new Order(this.request, { id: resumeOrderId }));
    }

    return new Orders(this.request).create({
      items,
      delivery_address: deliveryAddress,
    }).then((newOrder) => payForOrder(newOrder));
  }
}

module.exports = Cart;

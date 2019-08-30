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

  // Cart is valid if all item contain at least productId and quantity
  _isCartValid() {
    let valid = true;
    this._cart.forEach((item) => {
      if (Object.keys(item).length < 2 || !item.productId || !item.quantity) {
        valid = false;
      }
    });
    return valid;
  }

  _saveCart() {
    store.set('cart', this._cart);
  }

  // Check to see if two subproduct lists contain the same items. Doesn't care about order
  _compare(listA = [], listB = []) {
    if (!listA.length && !listB.length) return true; //both empty
    
    return listA.slice(0).sort().join('-') === listB.slice(0).sort().join('-');
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

  /* Add product. If product AND subproduct combination exists,
     we increment with provided quantity, otherwise it is
     added as another line in the cart */
  addProduct({ productId, quantity = 1, subProducts = [] }) {
    const exisitingProduct = this._findProductIndex(productId);

    if (exisitingProduct > -1) {
      if (this._compare(this._cart[exisitingProduct].subProducts, subProducts)) {
        this._cart[exisitingProduct].quantity += quantity;
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
    const exisitingProduct = this._findProductIndex(productId);

    if (exisitingProduct > -1) {
      if (this._cart[exisitingProduct].quantity <= quantity) {
        this._cart.splice(exisitingProduct, 1);
      } else {
        this._cart[exisitingProduct].quantity -= quantity;
      }
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
    if (!paymentMethodId) throw new Error('Missing payment method');

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

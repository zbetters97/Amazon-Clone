class Cart {
  cartItems;

  // private value
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();

    console.log("called");
  }

  // private method
  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(pId) {
    let quantity = document.querySelector(".data-quantity-selector-" + pId);
    quantity ? (quantity = Number(quantity.value)) : (quantity = 1);

    const index = this.cartItems.findIndex((p) => p.productId == pId);
    index === -1
      ? this.cartItems.push({
          productId: pId,
          quantity: quantity,
          deliveryOptionId: "1",
        })
      : (this.cartItems[index].quantity += quantity);

    this.saveToStorage();
  }
  removeFromCart(pId) {
    const index = this.cartItems.findIndex((p) => p.productId == pId);
    index !== -1 && this.cartItems.splice(index, 1);

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity > 0 && newQuantity < 1000) {
      this.cartItems.forEach((cartItem) => {
        cartItem.productId === productId &&
          (cartItem.quantity = Number(newQuantity));
      });

      this.saveToStorage();

      return true;
    } else {
      return false;
    }
  }
  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((product) => {
      cartQuantity += product.quantity;
    });

    return cartQuantity;
  }

  calculateTotalPriceCents(products) {
    let totalPrice = 0;

    this.cartItems.forEach((cartItem) => {
      const product =
        products[
          products.findIndex((product) => product.id == cartItem.productId)
        ] || null;

      totalPrice += cartItem.quantity * product.priceCents;
    });

    return totalPrice;
  }

  updateDeliveryOption(productId, deliveryId) {
    this.cartItems.forEach((cartItem) => {
      cartItem.productId === productId &&
        (cartItem.deliveryOptionId = deliveryId);
    });

    this.saveToStorage();
  }
}
let cart = new Cart("cart");
export default cart;

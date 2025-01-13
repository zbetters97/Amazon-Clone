export const cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(pId) {
  const quantity = Number(
    document.querySelector(".data-quantity-selector-" + pId).value
  );

  const index = cart.findIndex((p) => p.productId == pId);
  index === -1
    ? cart.push({
        productId: pId,
        quantity: quantity,
        deliveryOptionId: "1",
      })
    : (cart[index].quantity += quantity);

  saveToStorage();
}

export function removeFromCart(pId) {
  const index = cart.findIndex((p) => p.productId == pId);
  index !== -1 && cart.splice(index, 1);

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((product) => {
    cartQuantity += product.quantity;
  });

  return cartQuantity;
}

export function calculateTotalPriceCents(products) {
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const product =
      products[
        products.findIndex((product) => product.id == cartItem.productId)
      ] || null;

    totalPrice += cartItem.quantity * product.priceCents;
  });

  return totalPrice;
}

export function updateQuantity(productId, newQuantity) {
  if (newQuantity > 0 && newQuantity < 1000) {
    cart.forEach((cartItem) => {
      cartItem.productId === productId &&
        (cartItem.quantity = Number(newQuantity));
    });
    saveToStorage();

    return true;
  } else {
    return false;
  }
}

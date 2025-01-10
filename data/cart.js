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
      })
    : (cart[index].quantity += quantity);

  saveToStorage();
}

export function removeFromCart(pId) {
  const index = cart.findIndex((p) => p.productId == pId);
  index !== -1 && cart.splice(index, 1);

  saveToStorage();
}

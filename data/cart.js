export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 3,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
];

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
}

export function removeFromCart(pId) {
  const index = cart.findIndex((p) => p.productId == pId);
  index !== -1 && cart.splice(index, 1);
}

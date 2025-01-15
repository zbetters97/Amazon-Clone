export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  order && (orders.unshift(order), saveToStorage());
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function getOrder(orderId) {
  const order = orders.findIndex((o) => o.id == orderId) || orders[0];
  return order;
}

export function getOrderProduct(order, productId) {
  const product =
    order.products.findIndex((p) => p.productId == productId) ||
    order.products[0];
  return product;
}

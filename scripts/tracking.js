import cart from "./data/cart.js";
import { loadProducts, getProduct } from "./data/products.js";
import { getOrder, getOrderProduct } from "./data/orders.js";
import formatDateMDY from "./utils/date.js";

$(document).ready(function () {
  updateCartQuantity();
  loadPage();
});

function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();
  cartQuantity > 0 && $(".cart-quantity").html(cartQuantity);
}

async function loadPage() {
  // waits for loadProducts() before continuing
  try {
    await loadProducts();
  } catch (err) {
    console.log(err);
  }

  renderTrackingSummary();
}

function renderTrackingSummary() {
  let trackingHTML = ``;

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const orderProduct = getOrderProduct(order, productId);
  const product = getProduct(productId);

  const deliveryDate = formatDateMDY(orderProduct.estimatedDeliveryTime);
  const name = product.name;
  const quantity = orderProduct.quantity;
  const image = product.image;

  trackingHTML = `  
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryDate}
    </div>

    <div class="product-info">
      ${name}
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>

    <img
      class="product-image"
      src=${image}
    />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector(".js-tracking-summary").innerHTML = trackingHTML;
}

import cart from "./data/cart.js";
import { loadProducts, getProduct } from "./data/products.js";
import { orders } from "./data/orders.js";
import formatDateMDY from "./utils/date.js";
import formatCurrency from "./utils/money.js";

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

  renderOrdersGrid();
}

function renderOrdersGrid() {
  let orderHTML = ``;
  let productsHTML = ``;

  orders.forEach((orderItem) => {
    const orderDate = formatDateMDY(orderItem.orderTime);
    const priceCents = orderItem.totalCostCents;
    const price = formatCurrency(priceCents);
    const orderId = orderItem.id;

    orderHTML = `  
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${price}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>
  
        <div class="order-details-grid js-order-products-${orderId}">          
        </div>
      </div>
    `;
    document.querySelector(".js-order-grid").innerHTML += orderHTML;

    const products = orderItem.products;

    products.forEach((productElement) => {
      const productId = productElement.productId;
      const product = getProduct(productId);

      const image = product.image;
      const name = product.name;
      const deliveryDate = formatDateMDY(productElement.estimatedDeliveryTime);
      const quantity = productElement.quantity;

      productsHTML = `  
      <div class="product-image-container">
        <img src=${image} />
      </div>

      <div class="product-details">
        <div class="product-name">
          ${name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${quantity}
        </div>
        <div class="added-to-cart added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png" />
          Added to cart
        </div>

        <button 
          class="buy-again-button button-primary js-buy-again" 
          data-product-id=${product.id}
        >          
          <img class="buy-again-icon" src="images/icons/buy-again.png" />
          <span class="buy-again-message">
            Buy it again
          </span>
        </button>
      </div>

      <div class="product-actions">
        <!-- add more URL params here to track package -->
        <a href="tracking.html?orderId=${orderId}&productId=${productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      `;

      document.querySelector(`.js-order-products-${orderId}`).innerHTML +=
        productsHTML;
    });

    document.querySelectorAll(".js-buy-again").forEach((button) => {
      button.addEventListener("click", () => {
        // productId converted from data-product-id attribute
        const pId = button.dataset.productId;
        cart.addToCart(pId);
        updateCartQuantity();
        showAddToCartMsg(pId);
      });
    });
  });
}

function showAddToCartMsg(pId) {
  const addedMessage = document.querySelector(`.added-to-cart-${pId}`);
  addedMessage.style.opacity = 1;

  let addedMsgTimeouts = {};
  const previousTimeoutId = addedMsgTimeouts[pId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.style.opacity = 0;
  }, 2000);

  addedMsgTimeouts[pId] = timeoutId;
}

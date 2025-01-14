import { cart, addToCart, calculateCartQuantity } from "./data/cart.js";
import { products } from "./data/products.js";
import formatCurrency from "./utils/money.js";

$(document).ready(function () {
  updateCartQuantity();

  let productsHTML = "";
  products.forEach((product) => {
    const stars = product.rating.stars * 10;
    const price = formatCurrency(product.priceCents);

    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img
            class="product-image"
            src="${product.image}"
          />
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            class="product-rating-stars"
            src="images/ratings/rating-${stars}.png"
          />
          <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">
          $${price}
        </div>

        <div class="product-quantity-container">
          <select class="data-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button 
          class="add-to-cart-button button-primary" 
          data-product-id=${product.id}
        >
          Add to Cart
        </button>
      </div>`;
  });

  $(".products-grid").html(productsHTML);

  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      // productId converted from data-product-id attribute
      const pId = button.dataset.productId;
      addToCart(pId);
      updateCartQuantity();
      showAddToCartMsg(pId);
    });
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  cartQuantity > 0 && $(".cart-quantity").html(cartQuantity);
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

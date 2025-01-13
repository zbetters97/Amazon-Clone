import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const id = product.id;
    const image = product.image;
    const name = product.name;
    const price = formatCurrency(product.priceCents);
    const quantity = cartItem.quantity;

    const date = calculateDeliveryDate(
      getDeliveryOption(cartItem.deliveryOptionId)
    );

    cartSummaryHTML += `
      <div class="cart-item-container cart-item-container-${id}">
        <div class="delivery-date">Delivery date: ${date}</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src=${image}
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-price">
              $${price}
            </div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label item-quantity-${id}">
                ${quantity}
              </span> </span>
              <span class="update-quantity-link link-primary" data-product-id="${id}">
                Update
              </span>
              <input class="quantity-input quantity-${id}" data-product-id="${id}">
              <span class="save-quantity-link link-primary" data-product-id="${id}">Save</span>
              <span class="delete-quantity-link link-primary delete-link" data-product-id=${id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>           
              ${deliveryOptionsHTML(cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  $(".order-summary").html(cartSummaryHTML);

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelector(`.cart-item-container-${link.dataset.productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      updateItemQuantity(link.dataset.productId);

      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((link) => {
    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        updateItemQuantity(link.dataset.productId);

        renderCheckoutHeader();
        renderPaymentSummary();
      }
    });
  });

  document.querySelectorAll(".delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const pId = link.dataset.productId;
      removeFromCart(pId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

function deliveryOptionsHTML(cartItem) {
  let deliveryOptionsHTML = ``;

  const productId = cartItem.productId;

  deliveryOptions.forEach((deliveryOption) => {
    const deliveryId = deliveryOption.id;

    const date = calculateDeliveryDate(deliveryOption);

    const price =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

    const isChecked = deliveryId === cartItem.deliveryOptionId;

    deliveryOptionsHTML += `  
      <div class="delivery-option js-delivery-option" 
        data-product-id=${productId}
        data-delivery-option-id=${deliveryOption.id}>
        <input
          type="radio"
          ${isChecked && "checked"} 
          class="delivery-option-input"
          name="delivery-option-${productId}"
        />
        <div>
          <div class="delivery-option-date">${date}</div>
          <div class="delivery-option-price">${price} Shipping</div>
        </div>
      </div>
    `;
  });

  return deliveryOptionsHTML;
}

function updateItemQuantity(pId) {
  const newQuantity = document.querySelector(`.quantity-${pId}`) || null;

  if (updateQuantity(pId, newQuantity.value)) {
    updateItemTotal();

    document.querySelector(`.item-quantity-${pId}`).innerHTML =
      newQuantity.value;

    document
      .querySelector(`.cart-item-container-${pId}`)
      .classList.remove("is-editing-quantity");

    newQuantity.value = "";
  }
}

function updateItemTotal() {
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const product =
      products[
        products.findIndex((product) => product.id == cartItem.productId)
      ] || null;

    totalPrice += cartItem.quantity * product.priceCents;
  });
}

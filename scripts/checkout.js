import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "./data/products.js";

$(document).ready(function () {
  renderCheckoutHeader();

  // runs anonymous callback function once http request gets response
  loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});

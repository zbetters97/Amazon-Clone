import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

$(document).ready(function () {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

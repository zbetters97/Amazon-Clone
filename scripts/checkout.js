import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

$(document).ready(function () {
  renderOrderSummary();
  renderPaymentSummary();
});

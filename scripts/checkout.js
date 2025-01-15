import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "./data/products.js";

$(document).ready(function () {
  renderCheckoutHeader();

  // will not run .then() until resolve() is called
  new Promise((resolve) => {
    // will not run resolve() until response is given from XMLHTTP request
    loadProducts().then(() => {
      // resolve can give .then() a parameter
      resolve("my string");
    });
  }).then((stringParam) => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});

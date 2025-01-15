import { loadProducts } from "./data/products.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";

$(document).ready(function () {
  renderCheckoutHeader();
  loadPage();
});

/* SHORTCUT FOR THE FOLLOWING:
  new Promise((resolve) => {
    loadProducts().then(() => {
      resolve();
    });
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  }); 
*/
async function loadPage() {
  // waits for loadProducts() before continuing
  try {
    await loadProducts();
  } catch (err) {
    console.log(err);
  }

  renderOrderSummary();
  renderPaymentSummary();
}

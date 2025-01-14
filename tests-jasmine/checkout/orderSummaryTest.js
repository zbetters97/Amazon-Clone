import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../scripts/data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const pId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const pId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
      <div class="checkout-header"></div>
      <div class="order-summary"></div> 
      <div class="js-payment-summary"></div>   
    `;

    // replaces localStorage setItem() with fake empty method
    spyOn(Object.getPrototypeOf(localStorage), "setItem");

    // fills localStorage getItem() with fake cart object
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: pId1,
          quantity: 3,
          deliveryOptionId: "1",
        },
        {
          productId: pId2,
          quantity: 2,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();
    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${pId1}`).innerText
    ).toContain("Quantity: 3");
    expect(
      document.querySelector(`.js-product-quantity-${pId2}`).innerText
    ).toContain("Quantity: 2");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${pId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(document.querySelector(`.cart-item-container-${pId1}`)).toEqual(
      null
    );
    expect(document.querySelector(`.cart-item-container-${pId2}`)).not.toEqual(
      null
    );
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(pId2);
  });
});

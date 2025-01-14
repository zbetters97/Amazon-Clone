import { addToCart, cart, loadFromStorage } from "../../scripts/data/cart.js";

describe("test suite: cart", () => {
  describe("add to cart", () => {
    const testProductId = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    it("new product", () => {
      // replaces localStorage setItem() with fake empty method
      spyOn(Object.getPrototypeOf(localStorage), "setItem");

      // fills localStorage getItem() with fake empty object
      spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
        return JSON.stringify([]);
      });
      loadFromStorage();

      addToCart(testProductId);

      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);

      expect(cart[0].productId).toEqual(testProductId);
      expect(cart[0].quantity).toEqual(1);
    });

    it("existing product", () => {
      // replaces localStorage setItem() with fake empty method
      spyOn(Object.getPrototypeOf(localStorage), "setItem");

      // fills localStorage getItem() with fake cart object
      spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: testProductId,
            quantity: 1,
            deliveryOptionId: "1",
          },
        ]);
      });
      loadFromStorage();

      addToCart(testProductId);

      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);

      expect(cart[0].productId).toEqual(testProductId);
      expect(cart[0].quantity).toEqual(2);
    });
  });
});

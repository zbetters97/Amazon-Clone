import cart from "../../scripts/data/cart.js";

describe("test suite: cart", () => {
  describe("add to cart", () => {
    const testProductId = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    it("new product", () => {
      // replaces localStorage setItem() with fake empty method
      spyOn(Object.getPrototypeOf(localStorage), "setItem");

      cart.cartItems = [];
      cart.addToCart(testProductId);

      expect(cart.cartItems.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);

      expect(cart.cartItems[0].productId).toEqual(testProductId);
      expect(cart.cartItems[0].quantity).toEqual(1);
    });

    it("existing product", () => {
      // replaces localStorage setItem() with fake empty method
      spyOn(Object.getPrototypeOf(localStorage), "setItem");

      cart.cartItems = [
        {
          productId: testProductId,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ];
      cart.addToCart(testProductId);

      expect(cart.cartItems.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);

      expect(cart.cartItems[0].productId).toEqual(testProductId);
      expect(cart.cartItems[0].quantity).toEqual(2);
    });
  });
});

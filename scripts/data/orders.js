export default class Orders {
  #allOrders = [];

  // private value
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
  }

  #saveToStorage() {
    localStorage.setItem(
      this.#localStorageKey,
      JSON.stringify(this.#allOrders)
    );
  }

  addOrder(order) {
    // adds order to front of array
    this.#allOrders.unshift(order);
    this.#saveToStorage();
  }

  getAllOrders() {
    return this.#allOrders;
  }

  removeAllOrders() {
    this.#allOrders = [];
    localStorage.removeItem(this.#localStorageKey);
  }
}

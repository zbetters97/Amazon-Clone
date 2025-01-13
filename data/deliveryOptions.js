export function getDeliveryOption(deliveryId) {
  const deliveryOption =
    deliveryOptions[
      deliveryOptions.findIndex((delivery) => delivery.id === deliveryId)
    ];

  return deliveryOption || deliveryOptions[0];
}

export const deliveryOptions = [
  {
    id: "1",
    days: 7,
    priceCents: 0,
  },
  {
    id: "2",
    days: 3,
    priceCents: 499,
  },
  {
    id: "3",
    days: 1,
    priceCents: 999,
  },
];

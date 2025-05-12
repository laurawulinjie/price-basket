const BASE_URL = "http://localhost:8080";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/store/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getOffers() {
  const res = await fetch(`${BASE_URL}/store/offers`);
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
}

export async function updateBasketItem(name: string, count: number) {
  const res = await fetch(
    `${BASE_URL}/basket/update?name=${name}&count=${count}`,
    { method: "PUT" }
  );

  if (!res.ok) throw new Error(`Failed to update basket item ${name}`);
  return res.json();
}

export async function resetBasket() {
  const res = await fetch(`${BASE_URL}/basket/reset`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to reset basket");
  return res.json();
}

export async function getBasketItems() {
  const res = await fetch(`${BASE_URL}/basket/items`);
  if (!res.ok) throw new Error("Failed to fetch basket items");
  return res.json();
}

export async function getBasketPrice() {
  const res = await fetch(`${BASE_URL}/basket/price`);
  if (!res.ok) throw new Error("Failed to fetch basket price");
  return res.json();
}

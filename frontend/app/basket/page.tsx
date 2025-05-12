"use client";

import { useEffect, useState } from "react";
import {
  getBasketItems,
  getBasketPrice,
  updateBasketItem,
  resetBasket,
} from "@/lib/api";

export default function BasketPage() {
  const [items, setItems] = useState<[string, number][]>([]);
  const [price, setPrice] = useState<{
    subtotal: number;
    discount: number;
    discountInfo?: string;
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshBasket = async () => {
    setLoading(true);
    const [basketItems, priceInfo] = await Promise.all([
      getBasketItems(),
      getBasketPrice(),
    ]);
    setItems(basketItems);
    setPrice(priceInfo[0]);
    setLoading(false);
  };

  useEffect(() => {
    refreshBasket();
  }, []);

  const handleQuantityChange = async (name: string, count: number) => {
    await updateBasketItem(name, count);
    refreshBasket();
  };

  const handleReset = async () => {
    await resetBasket();
    refreshBasket();
  };

  if (loading) return <p className="p-4">Loading basket...</p>;

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Basket</h1>

      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {items.map(([name, count]) => (
            <div
              key={name}
              className="flex justify-between items-center border p-4 rounded shadow-sm"
            >
              <div>
                <p className="font-medium">{name}</p>
              </div>
              <input
                type="number"
                value={count}
                min={0}
                className="w-20 text-center border rounded p-1"
                onChange={(e) =>
                  handleQuantityChange(name, parseInt(e.target.value, 10))
                }
              />
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4 text-sm text-gray-700 space-y-1 mb-4">
        <p>
          <strong>Subtotal:</strong> £
          {price ? price.subtotal.toFixed(2) : "0.00"}
        </p>
        <p>
          <strong>Discount:</strong>{" "}
          {price && price.discount > 0
            ? `-£${price.discount.toFixed(2)}`
            : "(No offers available)"}
        </p>
        {price && price.discountInfo && price.discount > 0 && (
          <p className="text-xs text-green-600 whitespace-pre-line">
            {price.discountInfo}
          </p>
        )}
        <p className="text-lg font-semibold">
          Total: £{price ? price.total.toFixed(2) : "0.00"}
        </p>
      </div>

      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset Basket
      </button>
    </main>
  );
}

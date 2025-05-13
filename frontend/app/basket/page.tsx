"use client";

import Link from "next/link";
import { useBasket } from "@/context/BasketContext";

export default function BasketPage() {
  const { items, price, updateItem, reset } = useBasket();

  const filteredItems = items.filter(([, count]) => count > 0);

  const handleChange = (name: string, count: number) => {
    if (count < 0) return;
    updateItem(name, count);
  };

  const handleRemove = (name: string) => {
    updateItem(name, 0);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {filteredItems.length === 0 ? (
        <div className="mb-6">
          <p>Your basket is empty.</p>

          <Link href="/" className="text-blue-600 hover:underline">
            View available products
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {filteredItems.map(([name, count]) => (
            <div
              key={name}
              className="flex justify-between items-center border p-4 rounded shadow-sm"
            >
              <div>
                <p className="font-medium">{name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleChange(name, count - 1)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  –
                </button>
                <input
                  type="number"
                  value={count}
                  min={0}
                  className="w-16 text-center border rounded p-1"
                  onChange={(e) =>
                    handleChange(name, parseInt(e.target.value, 10))
                  }
                />
                <button
                  onClick={() => handleChange(name, count + 1)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(name)}
                  className="ml-2 text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
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

      {filteredItems.length > 0 && (
        <button
          onClick={reset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset Basket
        </button>
      )}
    </main>
  );
}

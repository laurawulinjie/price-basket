"use client";

import { useEffect, useState } from "react";
import { getProducts, updateBasketItem } from "@/lib/api";

type Product = {
  name: string;
  price: number;
  unit: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAddToBasket = async (product: Product) => {
    await updateBasketItem(product.name, 1);
    alert(`${product.name} added to basket`);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.name} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">
              £{product.price.toFixed(2)} per {product.unit}
            </p>
            <button
              onClick={() => handleAddToBasket(product)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Basket
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

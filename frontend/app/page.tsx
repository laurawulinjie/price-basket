"use client";

import { useEffect, useState } from "react";
import { getOffers, getProducts } from "@/lib/api";
import BasketButton from "@/components/BasketButton";

type Product = {
  name: string;
  price: number;
  unit: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<string[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
    getOffers().then(setOffers);
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>

      <div className="mb-6">
        <ul className="list-disc pl-6">
          {offers.map((offer, i) => (
            <li key={i}>{offer}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          return (
            <div key={product.name} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 pt-2">
                £{product.price.toFixed(2)} per {product.unit}
              </p>
              <div className="">
                <BasketButton name={product.name} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

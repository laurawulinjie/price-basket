"use client";

import { useBasket } from "@/context/BasketContext";

type BasketButtonProps = {
  name: string;
};

export default function BasketButton({ name }: BasketButtonProps) {
  const { items, updateItem } = useBasket();
  const count = items.find(([itemName]) => itemName === name)?.[1] ?? 0;
  const increase = () => updateItem(name, count + 1);

  const decrease = () => {
    if (count > 0) updateItem(name, count - 1);
  };

  return count === 0 ? (
    <button
      onClick={increase}
      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
    >
      Add to Basket
    </button>
  ) : (
    <div className="mt-3 flex items-center justify-between">
      <button
        onClick={decrease}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        –
      </button>
      <span className="text-lg font-semibold">{count}</span>
      <button
        onClick={increase}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        +
      </button>
    </div>
  );
}

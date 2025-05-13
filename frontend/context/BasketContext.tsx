"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getBasketItems,
  getBasketPrice,
  updateBasketItem,
  resetBasket,
} from "@/lib/api";

type BasketContextType = {
  items: [string, number][];
  price: {
    subtotal: number;
    discount: number;
    discountInfo?: string;
    total: number;
  } | null;
  itemCount: number;
  updateItem: (name: string, count: number) => Promise<void>;
  reset: () => Promise<void>;
  refresh: () => Promise<void>;
};

const BasketContext = createContext<BasketContextType | null>(null);

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within BasketProvider");
  }
  return context;
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<[string, number][]>([]);
  const [price, setPrice] = useState<BasketContextType["price"]>(null);

  const refresh = async () => {
    const [basketItems, basketPrice] = await Promise.all([
      getBasketItems(),
      getBasketPrice(),
    ]);
    setItems(basketItems);
    setPrice(basketPrice[0]);
  };

  useEffect(() => {
    refresh();
  }, []);

  const updateItem = async (name: string, count: number) => {
    await updateBasketItem(name, count);
    refresh();
  };

  const reset = async () => {
    await resetBasket();
    refresh();
  };

  const itemCount = items.reduce((sum, [, count]) => sum + count, 0);

  return (
    <BasketContext.Provider
      value={{ items, price, itemCount, updateItem, reset, refresh }}
    >
      {children}
    </BasketContext.Provider>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBasket } from "@/context/BasketContext";

export default function Header() {
  const pathname = usePathname();
  const { itemCount } = useBasket();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: `Basket (${itemCount})`, href: "/basket" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white px-6 py-4 shadow z-100">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">🛍️ Price Basket</h1>
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline ${
                pathname === link.href ? "underline text-yellow-300" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

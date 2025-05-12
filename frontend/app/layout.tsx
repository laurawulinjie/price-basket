import "./globals.css";
import Header from "@/components/Header";
import { ReactNode } from "react";

export const metadata = {
  title: "Price Basket",
  description: "A simple shopping basket demo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="pt-20 min-h-screen px-4">{children}</main>
      </body>
    </html>
  );
}

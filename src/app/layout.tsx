import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Strawberries | Pure. Fresh. Premium.",
  description: "Experience the freshest organic strawberries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#050505] text-white antialiased selection:bg-[#FF1744] selection:text-white`}>
        <AuthProvider>
          <CartProvider>
            <NavBar />
            <CartDrawer />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

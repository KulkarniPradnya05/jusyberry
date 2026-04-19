"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  total: number;
  gst: number;
  grandTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence (Load)
  useEffect(() => {
    const saved = localStorage.getItem("strawberry-cart");
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  // Persistence (Save)
  useEffect(() => {
    localStorage.setItem("strawberry-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => 
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart to show feedback
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) => 
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = total * 0.18; // 18% GST calculation (Standard for India/Beverages)
  const grandTotal = total + gst;

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, 
      isCartOpen, setIsCartOpen, total, gst, grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

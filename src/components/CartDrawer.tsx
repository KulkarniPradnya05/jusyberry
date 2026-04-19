"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total, gst, grandTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Background Overlay (Click to close) */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ease-out"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-white flex items-center gap-3">
            <svg className="w-5 h-5 text-[#FF1744]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Your Cart
          </h2>
          <button 
            className="text-white/40 hover:text-white transition-colors p-2"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
              <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="tracking-widest uppercase text-sm">Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 relative group hover:border-[#FF1744]/30 transition-colors">
                
                {/* Product Image */}
                <div className="w-20 h-24 bg-[#050505] rounded-xl flex items-center justify-center p-2 shrink-0 border border-white/5">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-white font-semibold text-sm tracking-wide">{item.name}</h3>
                    <p className="text-white/40 text-[11px] uppercase tracking-widest mt-1">₹{item.price.toFixed(2)}</p>
                  </div>

                  {/* E-commerce Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-black/40 border border-white/10 rounded-full h-8 overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 text-white/50 hover:text-[#FF1744] hover:bg-white/5 transition-colors"
                      >−</button>
                      <span className="text-xs font-bold text-white px-2 min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 text-white/50 hover:text-[#FF1744] hover:bg-white/5 transition-colors"
                      >+</button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] uppercase tracking-widest text-[#FF1744]/70 hover:text-[#FF1744] transition-colors underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 bg-black/40 border-t border-white/10 shrink-0 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
            
            {/* Cost Breakdown */}
            <div className="flex flex-col gap-2 mb-6 text-sm font-light">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="w-full h-[1px] bg-white/10 my-2" />
              <div className="flex justify-between text-white text-lg font-bold">
                <span>Total</span>
                <span className="text-[#FF1744]">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Huge Premium Checkout Button */}
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full group relative overflow-hidden rounded-full py-4 bg-[#111] shadow-[0_0_20px_rgba(255,23,68,0.2)] hover:shadow-[0_0_40px_rgba(255,23,68,0.6)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] ease-out duration-300"></div>
              <span className="relative z-10 text-xs text-white uppercase tracking-[0.2em] font-bold">Secure Checkout &rarr;</span>
            </button>

          </div>
        )}

      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}

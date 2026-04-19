"use client";

import Link from 'next/link';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { setIsCartOpen, items } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-xl bg-[#050505]/40 border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Luxury Logo */}
        <div className="flex-shrink-0 group cursor-pointer">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-2">
            STRAW<span className="text-[#FF1744] transition-colors duration-300 group-hover:text-[#FF6B9D]">BERRY.</span>
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          <Link href="/#about" className="text-[11px] uppercase font-semibold tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Our Farm
          </Link>
          <Link href="/products" className="text-[11px] uppercase font-semibold tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/#journal" className="text-[11px] uppercase font-semibold tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Journal
          </Link>
          <Link href="/#contact" className="text-[11px] uppercase font-semibold tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Global CTAs */}
        <div className="flex items-center space-x-5 lg:space-x-8">
          
          {user ? (
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-[#FF1744] text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-[#FF1744]/10 rounded-md">Welcome, {user.name.split(" ")[0]}</span>
              <button onClick={logout} className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 hover:text-[#FF1744] transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden lg:inline-flex text-[11px] font-bold uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors">
              Log In
            </Link>
          )}
          
          {/* Cart Icon with Live Notification */}
          <button 
             onClick={() => setIsCartOpen(true)}
             className="relative group p-2 hover:-translate-y-0.5 transition-transform duration-300"
          >
            <div className="absolute inset-0 bg-[#FF1744]/0 group-hover:bg-[#FF1744]/10 rounded-full blur-md transition-colors duration-300" />
            <svg className="w-4 h-4 text-white/80 group-hover:text-[#FF1744] transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF1744] text-white text-[8px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_#FF1744]">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button className="group relative text-[11px] font-bold uppercase tracking-[0.15em] text-white overflow-hidden rounded-full shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:shadow-[0_0_35px_rgba(255,23,68,0.5)] transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] ease-out duration-300 group-hover:opacity-100"></div>
            <span className="relative z-10 block px-6 py-3">Order Now</span>
          </button>

        </div>
        
      </div>
    </nav>
  );
}

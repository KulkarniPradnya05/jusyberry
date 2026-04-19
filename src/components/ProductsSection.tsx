"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const products = [
  {
    id: "1",
    name: "New Arrival",
    desc: "Cold-Pressed Chikoo Selection",
    tag: "New Arrival",
    price: 499.00,
    img: "/Strawberry1/chikoo.png"
  },
  {
    id: "2",
    name: "Blueberry Sunrise",
    desc: " Wild Blueberry Blend",
    tag: "New Arrival",
    price: 399.00,
    img: "/Strawberry1/blueberry.png"
  },
  {
    id: "3",
    name: "Guava Glow",
    desc: " Fresh Guava",
    tag: "Limited Edition",
    price: 549.00,
    img: "/Strawberry1/Guava.png"
  }
];

export default function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    addToCart({ ...product, quantity: 1 });
  };

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) ob.observe(containerRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section ref={containerRef} id="products" className="relative w-full bg-[#030303] py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className={`text-center mb-20 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h4 className="text-[#FF1744] font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4">Our Products</h4>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Try Our New <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">Flavors.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-all duration-700 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >

              {/* Product Image Stage */}
              <div className="w-full aspect-square relative bg-[#0a0a0a] rounded-lg mb-6 flex items-center justify-center p-6 border border-white/5 overflow-hidden">
                <div className="absolute top-3 left-3 bg-[#FF1744] text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm z-10">
                  {product.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF1744]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Amazon Style Information Cluster (Strictly Left-Aligned) */}
              <div className="flex flex-col flex-1 w-full text-left">

                {/* Title */}
                <h3 className="line-clamp-2 text-lg font-medium text-white/90 group-hover:text-[#FF1744] transition-colors leading-tight mb-2">
                  {product.name} - {product.desc}
                </h3>

                {/* Amazon-style Ratings */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-[#FF1744] text-[12px] tracking-tighter">
                    ★★★★★
                  </div>
                  <span className="text-white/40 hover:text-[#FF1744] cursor-pointer text-xs font-medium transition-colors">14,203</span>
                </div>

                {/* Amazon-style Price Composition */}
                <div className="flex items-start text-white mb-2 font-light">
                  <span className="text-xs mt-1 mr-0.5">₹</span>
                  <span className="text-3xl font-semibold">{Math.floor(product.price)}</span>
                  <span className="text-sm mt-1 ml-0.5 font-medium">
                    {(product.price % 1).toFixed(2).substring(2) === "00" ? "00" : (product.price % 1).toFixed(2).substring(2)}
                  </span>
                </div>

                {/* Shipping & Delivery Notice */}
                <div className="flex flex-col gap-0.5 mb-6">
                  <span className="text-xs text-white/60">
                    Get it by <span className="font-bold text-white">Tomorrow</span>
                  </span>
                  <p className="text-xs text-green-400 font-bold uppercase tracking-wide">In Stock</p>
                </div>

                {/* Spacer to push button to bottom if height varies */}
                <div className="flex-1" />

                {/* Amazon-style Utilitarian Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-3 bg-[#FF1744] hover:bg-[#D50032] text-white rounded-full font-bold text-sm transition-colors shadow-[0_4px_14px_rgba(255,23,68,0.4)] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

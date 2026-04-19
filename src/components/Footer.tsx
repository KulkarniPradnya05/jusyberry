"use client";

import { useRef, useEffect } from "react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#020202] pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Massive Background Brand Mark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.02]">
        <span className="text-[15rem] md:text-[25rem] lg:text-[35rem] font-bold tracking-tighter leading-none whitespace-nowrap">
          STRAWBERRY.
        </span>
      </div>

      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#FF1744]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] max-w-lg h-[200px] bg-[#FF1744]/[0.05] blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-2xl font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF1744] shadow-[0_0_15px_#FF1744]" />
              STRAW<span className="text-white/40">BERRY.</span>
            </h3>
            <p className="text-white/40 font-light text-sm md:text-base max-w-sm mb-12 leading-relaxed">
              Experience the purest cold-pressed strawberry juice, harvested deeply from organic soils and delivered strictly fresh.
            </p>
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold">Join the inner circle</span>
              <div className="relative w-full max-w-sm group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 pr-10 text-white placeholder-white/20 focus:outline-none focus:border-[#FF1744] transition-colors"
                />
                <button className="absolute right-0 top-0 bottom-3 text-white/40 group-hover:text-[#FF1744] transition-colors text-xl font-light">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Column 1 */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[#FF1744] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">Navigation</span>
            <ul className="flex flex-col gap-4">
              {['Our Farm', 'Products', 'The Journal', 'Wholesale', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-all duration-300 font-light text-sm flex items-center group">
                    <span className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden inline-block text-[#FF1744] opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2">―</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[#FF1744] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">Socials</span>
            <ul className="flex flex-col gap-4">
              {['Instagram', 'Twitter / X', 'YouTube', 'TikTok'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-[#FF1744] transition-colors duration-300 font-light text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Bottom Legal bar */}
        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-light tracking-[0.1em]">
            © {new Date().getFullYear()} STRAWBERRY INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white text-xs font-light transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white text-xs font-light transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

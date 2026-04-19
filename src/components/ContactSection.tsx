"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section ref={containerRef} id="contact" className="relative w-full bg-[#050505] py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[#FF1744]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Header Info */}
          <div className={`w-full lg:w-5/12 flex flex-col justify-center transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <h4 className="text-[#FF1744] font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4">Contact Us</h4>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-6">
              Connect with our <br/>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">farm members.</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-12">
              Whether you have a question about our zero-pesticide organic farming methods, wholesale orders, or simply want to say hello, we are always here. Direct from our fields to your inbox.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">📍</div>
                <div className="flex flex-col">
                  <span className="text-white/40 text-xs tracking-widest uppercase">Visit Us</span>
                  <span className="text-white text-sm">104 Organic Valley, California</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">✉️</div>
                <div className="flex flex-col">
                  <span className="text-white/40 text-xs tracking-widest uppercase">Email</span>
                  <span className="text-white text-sm">hello@strawberryfarm.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Form */}
          <div className={`w-full lg:w-7/12 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'} delay-200`}>
            <form className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col gap-8 shadow-2xl backdrop-blur-md">
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-white/10 text-white placeholder-white/20 pb-3 px-1 focus:outline-none focus:border-[#FF1744] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-white/10 text-white placeholder-white/20 pb-3 px-1 focus:outline-none focus:border-[#FF1744] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Your Inquiry</label>
                <textarea 
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full bg-transparent border-b border-white/10 text-white placeholder-white/20 pb-3 px-1 focus:outline-none focus:border-[#FF1744] transition-colors resize-none"
                />
              </div>

              <button 
                type="button"
                className="mt-4 w-full bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] text-white font-bold tracking-[0.2em] uppercase text-xs py-4 rounded-xl shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:shadow-[0_0_30px_rgba(255,23,68,0.5)] hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans antialiased overflow-x-hidden pt-24">
      
      {/* Product Hero 0: Classic Strawberry Best Seller */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row-reverse items-center pt-12 lg:pt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF1744]/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-6 lg:px-12 relative z-10">
          <div className="relative group w-full max-w-[500px]">
             {/* Dynamic bottle float animation */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#FF1744]/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <img 
                src="/Strawberry1/strawberie.png" 
                alt="#1 Best Seller"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-float transition-transform duration-[2000ms] ease-out group-hover:scale-105"
             />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right px-6 lg:px-24 mt-12 lg:mt-0 relative z-10">
          <span className="text-[#FF1744] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 px-3 py-1 border border-[#FF1744]/30 rounded-full animate-pulse">Global #1 Best Seller</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Original <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">Strawberry.</span></h1>
          <p className="text-white/50 text-base md:text-lg max-w-md font-light leading-relaxed mb-8">
            The masterpiece that started it all. 100% strictly organic, cold-pressed strawberries. No water. No sugar. Just absolute perfection.
          </p>
          
          <div className="flex items-end gap-4 mb-10 text-right justify-end">
            <span className="text-4xl font-light text-white">₹599<span className="text-xl text-white/40">.00</span></span>
          </div>

          <button 
             onClick={() => handleAddToCart({ id: "0", name: "#1 Best Seller", price: 599.00, img: "/Strawberry1/strawberie.png", quantity: 1 })}
             className="group relative overflow-hidden rounded-full w-[280px] h-[60px] bg-[#FF1744] shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:shadow-[0_0_40px_rgba(255,23,68,0.6)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[#D50032] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center gap-3 relative z-10 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white">Add To Cart</span>
            </div>
          </button>
        </div>
      </section>

      {/* Product Divider */}
      <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* Product Hero 1: Chikoo Signature */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF1744]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-6 lg:px-12 relative z-10">
          <div className="relative group w-full max-w-[500px]">
             {/* Dynamic bottle float animation */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#FF1744]/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <img 
                src="/Strawberry1/chikoo.png" 
                alt="Chikoo Signature"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float transition-transform duration-[2000ms] ease-out group-hover:scale-105"
             />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-6 lg:px-24 mt-12 lg:mt-0 relative z-10">
          <span className="text-[#FF1744] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 px-3 py-1 border border-[#FF1744]/30 rounded-full">#1 Best Seller</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Chikoo <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">Signature.</span></h1>
          <p className="text-white/50 text-base md:text-lg max-w-md font-light leading-relaxed mb-8">
            Experience the unprecedented fusion of strictly organic cold-pressed strawberries cut with the rich, caramel sweetness of authentic Sapodilla (Chikoo).
          </p>
          
          <div className="flex items-end gap-4 mb-10">
            <span className="text-4xl font-light text-white">₹499<span className="text-xl text-white/40">.00</span></span>
            <span className="text-white/30 text-sm mb-1 line-through">₹699.00</span>
          </div>

          <button 
            onClick={() => handleAddToCart({ id: "1", name: "Chikoo Signature", price: 499.00, img: "/Strawberry1/chikoo.png", quantity: 1 })}
            className="group relative overflow-hidden rounded-full w-[280px] h-[60px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_20px_rgba(255,23,68,0.15)] hover:shadow-[0_0_40px_rgba(255,23,68,0.4)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center gap-3 relative z-10 transition-transform duration-300">
              <svg className="w-5 h-5 text-[#FF1744] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white">Add To Cart</span>
            </div>
          </button>
        </div>
      </section>

      {/* Product Divider */}
      <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* Product Hero 2: Blueberry Sunrise */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row-reverse items-center">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-6 lg:px-12 relative z-10">
          <div className="relative group w-full max-w-[500px]">
             <img 
                src="/Strawberry1/blueberry.png" 
                alt="Blueberry Sunrise"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float transition-transform duration-[2000ms] opacity-90 group-hover:opacity-100 ease-out group-hover:scale-105"
             />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right px-6 lg:px-24 mt-12 lg:mt-0 relative z-10">
          <span className="text-[#FF1744] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 px-3 py-1 border border-[#FF1744]/30 rounded-full">New Arrival</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Blueberry <br/><span className="font-light italic text-white/80">Sunrise.</span></h2>
          <p className="text-white/50 text-base md:text-lg max-w-md font-light leading-relaxed mb-8">
            An antioxidant powerhouse mixing our signature vivid strawberries with wild, deep forest blueberries sourced entirely organically.
          </p>
          
          <div className="flex items-end gap-4 mb-10 text-right justify-end">
            <span className="text-4xl font-light text-white">₹399<span className="text-xl text-white/40">.00</span></span>
          </div>

          <button 
             onClick={() => handleAddToCart({ id: "2", name: "Blueberry Sunrise", price: 399.00, img: "/Strawberry1/blueberry.png", quantity: 1 })}
             className="group relative overflow-hidden rounded-full w-[280px] h-[60px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_20px_rgba(255,23,68,0.1)] hover:shadow-[0_0_40px_rgba(255,23,68,0.3)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center gap-3 relative z-10">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 group-hover:text-white">Add To Cart</span>
            </div>
          </button>
        </div>
      </section>
      
      {/* Product Divider */}
      <div className="w-full max-w-5xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* Product Hero 3: Guava Glow */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center mb-24">
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-6 lg:px-12 relative z-10">
          <div className="relative group w-full max-w-[500px]">
             <img 
                src="/Strawberry1/Guava.png" 
                alt="Guava Glow"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float transition-transform duration-[2000ms] opacity-90 group-hover:opacity-100 ease-out group-hover:scale-105"
             />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-6 lg:px-24 mt-12 lg:mt-0 relative z-10">
          <span className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 px-3 py-1 border border-white/10 rounded-full">Limited Edition</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Guava <br/>Glow.</h2>
          <p className="text-white/50 text-base md:text-lg max-w-md font-light leading-relaxed mb-8">
            An utterly refreshing, tropical twist. Perfect cold-pressed strawberries merged precisely with the sweet floral notes of fresh Guava.
          </p>
          
          <div className="flex items-end gap-4 mb-10">
            <span className="text-4xl font-light text-white">₹549<span className="text-xl text-white/40">.00</span></span>
          </div>

          <button 
             onClick={() => handleAddToCart({ id: "3", name: "Guava Glow", price: 549.00, img: "/Strawberry1/Guava.png", quantity: 1 })}
             className="group relative overflow-hidden rounded-full w-[280px] h-[60px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_20px_rgba(255,23,68,0.1)] hover:shadow-[0_0_40px_rgba(255,23,68,0.3)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center gap-3 relative z-10">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 group-hover:text-white">Add To Cart</span>
            </div>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

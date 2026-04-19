export default function CTASection() {
  return (
    <section className="relative py-48 overflow-hidden flex items-center justify-center text-center bg-[#050505] min-h-[80vh] z-10 w-full">
      {/* Radial Gradient background Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none z-0">
        <div className="w-[800px] h-[800px] bg-gradient-radial from-[#FF1744]/20 to-transparent rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <button className="group relative px-14 py-5 rounded-full overflow-hidden scale-100 hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:shadow-[0_0_50px_rgba(255,23,68,0.7)] mt-12 mb-8 border border-white/10">
          {/* Main Button Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] ease-out duration-300"></div>
          
          {/* Soft pulsating glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#FF1744] mix-blend-screen transition-opacity duration-300 animate-[pulse_2s_ease-in-out_infinite]"></div>
          
          <span className="relative z-10 text-white font-semibold text-xl tracking-[0.15em] uppercase">Order Now</span>
        </button>
        
        <p className="mt-2 text-white/50 text-[13px] tracking-[0.25em] font-light uppercase drop-shadow-sm">
          Free delivery on your first order
        </p>
      </div>

      {/* Very subtle floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNGRjE3NDQiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] animate-[drift_40s_linear_infinite]" style={{ backgroundSize: '60px 60px' }}></div>
    </section>
  );
}

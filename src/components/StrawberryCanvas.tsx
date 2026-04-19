"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;

export default function StrawberryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for primary typography sequences (Scroll-linked)
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const images = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      // Appended a cache buster so the browser forces the download of the fresh image replacements
      img.src = `/Strawberry1/ezgif-frame-${frameNumber}.png?v=3`;
      
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === FRAME_COUNT) setIsFullyLoaded(true);
        if (i === 1) requestAnimationFrame(() => renderFrame(0));
      };

      img.onerror = () => {
        console.warn(`Failed to load frame ${frameNumber}. Bypassing.`);
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === FRAME_COUNT) setIsFullyLoaded(true);
      };
      
      images.current.push(img);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFrame = (frameIndex: number) => {
    if (!canvasRef.current || !images.current[frameIndex]) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    
    // Prevent massive layout thrashing by ONLY resizing canvas if window changed
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const img = images.current[frameIndex];
    if (!img) return;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight;
    // Core 'contain' logic: guarantees the bottle is never aggressively zoomed or cut
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
    }
    
    // Scale down slightly for elegant breathing room around the bottle
    const SCALE_FACTOR = 0.90; 
    drawWidth *= SCALE_FACTOR;
    drawHeight *= SCALE_FACTOR;

    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;

    // Use full deep black
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // Store floating frame interpolation values
  const frameData = useRef({ current: 0, target: 0 });

  useEffect(() => {
    let animationFrameId: number;

    // The Apple-like inertia render loop
    const renderLoop = () => {
      const diff = frameData.current.target - frameData.current.current;
      
      // If there's a difference between current frame and target frame, interpolate
      if (Math.abs(diff) > 0.01) {
        frameData.current.current += diff * 0.04; // 0.04 creates an ultra-premium, incredibly heavy cinematic Apple inertia
        
        let roundedFrame = Math.floor(frameData.current.current);
        // Safely bounds check
        roundedFrame = Math.max(0, Math.min(FRAME_COUNT - 1, roundedFrame));
        renderFrame(roundedFrame);
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start the endless loop
    animationFrameId = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const maxScroll = height - windowHeight;
      
      // Calculate exact scroll fraction percentage
      const scrollFraction = Math.max(0, Math.min(1, -top / maxScroll));
      
      // Define where the frame SHOULD be. The renderLoop will smoothly ease it here.
      frameData.current.target = scrollFraction * FRAME_COUNT;
      
      // Apply the existing typography logic directly based on the fixed scroll pointer
      updateTextAnimations(scrollFraction);
    };

    const updateTextAnimations = (scrollFraction: number) => {
      // ===== CENTRAL TYPOGRAPHY ANIMATIONS (Scroll Linked) =====
      
      if (text1Ref.current) {
        if (scrollFraction > 0.03 && scrollFraction < 0.25) {
          text1Ref.current.style.opacity = "1";
          text1Ref.current.style.transform = "translate(-50%, 0) scale(1)";
          text1Ref.current.style.filter = "blur(0px)";
        } else {
          text1Ref.current.style.opacity = "0";
          text1Ref.current.style.transform = scrollFraction >= 0.25 ? "translate(-50%, -20px) scale(0.95)" : "translate(-50%, 20px) scale(1.05)";
          text1Ref.current.style.filter = "blur(4px)";
        }
      }

      if (text2Ref.current) {
        if (scrollFraction > 0.28 && scrollFraction < 0.65) {
          text2Ref.current.style.opacity = "1";
          text2Ref.current.style.transform = "translate(-50%, 0) scale(1)";
          text2Ref.current.style.filter = "blur(0px)";
        } else {
          text2Ref.current.style.opacity = "0";
          text2Ref.current.style.transform = scrollFraction >= 0.65 ? "translate(-50%, -20px) scale(0.95)" : "translate(-50%, 20px) scale(1.05)";
          text2Ref.current.style.filter = "blur(4px)";
        }
      }

      if (taglineRef.current) {
        if (scrollFraction > 0.75) {
          taglineRef.current.style.opacity = "1";
          taglineRef.current.style.transform = "translate(-50%, 0) scale(1)";
          taglineRef.current.style.filter = "blur(0px)";
        } else {
          taglineRef.current.style.opacity = "0";
          taglineRef.current.style.transform = "translate(-50%, 30px) scale(0.95)";
          taglineRef.current.style.filter = "blur(4px)";
        }
      }
    };
    
    // Use passive listener for extreme browser scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleResize = () => requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollFraction = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      frameData.current.target = scrollFraction * FRAME_COUNT;
      handleScroll();
    });
    
    window.addEventListener("resize", handleResize);
    setTimeout(() => handleResize(), 50);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#050505] font-sans">
      
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">
        
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ display: "block" }} 
        />
        
        {/* Cinematic Edge Vignette to forcefully blend any video framing softly into the exact brand background color */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050505_75%)] z-0" />

        {!isFullyLoaded && (
            <div className="absolute top-24 right-8 z-50 text-white/40 text-[10px] uppercase tracking-widest bg-black/40 px-4 py-2 backdrop-blur-md rounded-full border border-white/10 pointer-events-none">
            Loading Sequence: {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
        )}

        {/* =========================================
            CINEMATIC CENTER TEXT LABELS 
            ========================================= */}
        <div 
          ref={text1Ref} 
          className="absolute top-[20%] lg:top-[25%] left-1/2 -translate-x-1/2 opacity-0 transition-all duration-[800ms] ease-out pointer-events-none z-10 w-full flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.1em] text-center px-4 drop-shadow-2xl whitespace-nowrap">
            Harvested at <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">peak perfection.</span>
          </h2>
        </div>

        <div 
          ref={text2Ref} 
          className="absolute top-[20%] lg:top-[25%] left-1/2 -translate-x-1/2 opacity-0 transition-all duration-[800ms] ease-out pointer-events-none z-10 w-full flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.1em] text-center px-4 drop-shadow-2xl whitespace-nowrap">
            Uncompromisingly <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">organic.</span>
          </h2>
        </div>

        <div 
          ref={taglineRef} 
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 opacity-0 translate-y-8 transition-all duration-[1000ms] ease-out pointer-events-none z-10 w-full flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.15em] text-center px-4 drop-shadow-[0_4px_30px_rgba(255,23,68,0.7)] whitespace-nowrap">
            Pure. Fresh. <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">Premium.</span>
          </h1>
        </div>

        {/* =========================================
            STATIC FLOATING UI CARDS (Always visible, Flexbox safety constraint)
            ========================================= */}
            
        {/* LEFT COLUMN */}
        <div className="absolute inset-y-0 left-[2%] sm:left-[5%] lg:left-[8%] py-[15vh] md:py-[20vh] z-20 flex flex-col justify-between items-start pointer-events-none gap-6">
          
          {/* Left Side Card 1 - Zero Added Sugar */}
          <div className="pointer-events-auto animate-card-1">
            <div className="flex flex-col items-start gap-2 backdrop-blur-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.08] hover:-translate-y-2 hover:border-[#FF1744]/50 hover:shadow-[0_0_30px_rgba(255,23,68,0.3)] transition-all duration-300 cursor-pointer w-[140px] sm:w-[180px]">
              <div className="w-10 h-10 rounded-full bg-[#FF1744]/10 flex items-center justify-center mb-2 border border-[#FF1744]/30 text-lg sm:text-xl shadow-[inset_0_0_10px_rgba(255,23,68,0.2)]">🚫</div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#FF1744] uppercase">Natural</span>
              <span className="text-sm sm:text-base font-light text-white leading-snug">Zero Added<br/>Sugar</span>
            </div>
          </div>

          {/* Left Side Card 2 - 100% Organic */}
          <div className="pointer-events-auto animate-card-2">
            <div className="flex flex-col items-start gap-2 backdrop-blur-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.08] hover:-translate-y-2 hover:border-[#FF1744]/50 hover:shadow-[0_0_30px_rgba(255,23,68,0.3)] transition-all duration-300 cursor-pointer w-[140px] sm:w-[180px]">
              <div className="w-10 h-10 rounded-full bg-[#FF1744]/10 flex items-center justify-center mb-2 border border-[#FF1744]/30 text-lg sm:text-xl shadow-[inset_0_0_10px_rgba(255,23,68,0.2)]">🌱</div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#FF1744] uppercase">Farming</span>
              <span className="text-sm sm:text-base font-light text-white leading-snug">100%<br/>Organic</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="absolute inset-y-0 right-[2%] sm:right-[5%] lg:right-[8%] py-[15vh] md:py-[20vh] z-20 flex flex-col justify-between items-end pointer-events-none gap-6">
          
          {/* Right Side Card 1 - Pure Premium */}
          <div className="pointer-events-auto animate-card-3">
            <div className="flex flex-col items-end gap-2 backdrop-blur-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.08] hover:-translate-y-2 hover:border-[#FF6B9D]/50 hover:shadow-[0_0_30px_rgba(255,107,157,0.3)] transition-all duration-300 cursor-pointer text-right w-[140px] sm:w-[180px]">
              <div className="w-10 h-10 rounded-full bg-[#FF6B9D]/10 flex items-center justify-center mb-2 border border-[#FF6B9D]/30 text-lg sm:text-xl shadow-[inset_0_0_10px_rgba(255,107,157,0.2)]">✨</div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#FF6B9D] uppercase">Quality</span>
              <span className="text-sm sm:text-base font-light text-white leading-snug">Pure<br/>Premium</span>
            </div>
          </div>

          {/* Right Side Card 2 - Cold Pressed */}
          <div className="pointer-events-auto animate-card-4">
            <div className="flex flex-col items-end gap-2 backdrop-blur-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.08] hover:-translate-y-2 hover:border-[#FF6B9D]/50 hover:shadow-[0_0_30px_rgba(255,107,157,0.3)] transition-all duration-300 cursor-pointer text-right w-[140px] sm:w-[180px]">
              <div className="w-10 h-10 rounded-full bg-[#FF6B9D]/10 flex items-center justify-center mb-2 border border-[#FF6B9D]/30 text-lg sm:text-xl shadow-[inset_0_0_10px_rgba(255,107,157,0.2)]">❄️</div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#FF6B9D] uppercase">Process</span>
              <span className="text-sm sm:text-base font-light text-white leading-snug">Cold<br/>Pressed</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

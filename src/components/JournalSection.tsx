"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;

export default function JournalSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  
  // Trackers for scroll inertia
  const frameData = useRef({ current: 0, target: 0 });

  // Typographic references
  const quote1Ref = useRef<HTMLDivElement>(null);
  const quote2Ref = useRef<HTMLDivElement>(null);
  const quote3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loaded = 0;
    
    // Preload all 176 Journal frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/straw/ezgif-frame-${frameNumber}.png?v=1`;
      
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === FRAME_COUNT) setIsFullyLoaded(true);
        if (i === 1) requestAnimationFrame(() => renderFrame(0));
      };

      img.onerror = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === FRAME_COUNT) setIsFullyLoaded(true);
      };
      
      images.current.push(img);
    }
  }, []);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || !images.current[index]) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const img = images.current[index];

    // Resize canvas dynamically to physically match screen resolution to prevent blur
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight;
    // Core 'contain' logic: guarantees the image is NEVER chopped or cut.
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
    }

    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;

    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y, drawWidth, drawHeight);
  };

  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const diff = frameData.current.target - frameData.current.current;
      
      if (Math.abs(diff) > 0.01) {
        frameData.current.current += diff * 0.08; // Luxurious Apple-like weighty inertia
        let roundedFrame = Math.floor(frameData.current.current);
        roundedFrame = Math.max(0, Math.min(FRAME_COUNT - 1, roundedFrame));
        renderFrame(roundedFrame);
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const maxScroll = height - windowHeight;
      const scrollFraction = Math.max(0, Math.min(1, -top / maxScroll));
      
      frameData.current.target = scrollFraction * FRAME_COUNT;
      updateTextAnimations(scrollFraction);
    };

    const updateTextAnimations = (scrollFraction: number) => {
      if (quote1Ref.current) {
        if (scrollFraction > 0.05 && scrollFraction < 0.3) {
          quote1Ref.current.style.opacity = "1";
          quote1Ref.current.style.transform = "translate(0, 0) scale(1)";
        } else {
          quote1Ref.current.style.opacity = "0";
          quote1Ref.current.style.transform = scrollFraction >= 0.3 ? "translate(0, -30px) scale(0.95)" : "translate(0, 30px) scale(1.05)";
        }
      }

      if (quote2Ref.current) {
        if (scrollFraction > 0.35 && scrollFraction < 0.6) {
          quote2Ref.current.style.opacity = "1";
          quote2Ref.current.style.transform = "translate(0, 0) scale(1)";
        } else {
          quote2Ref.current.style.opacity = "0";
          quote2Ref.current.style.transform = scrollFraction >= 0.6 ? "translate(0, -30px) scale(0.95)" : "translate(0, 30px) scale(1.05)";
        }
      }

      if (quote3Ref.current) {
        if (scrollFraction > 0.65 && scrollFraction < 0.95) {
          quote3Ref.current.style.opacity = "1";
          quote3Ref.current.style.transform = "translate(0, 0) scale(1)";
        } else {
          quote3Ref.current.style.opacity = "0";
          quote3Ref.current.style.transform = scrollFraction >= 0.95 ? "translate(0, -30px) scale(0.95)" : "translate(0, 30px) scale(1.05)";
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleResize = () => requestAnimationFrame(() => {
      if (!containerRef.current) return;
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
    <section ref={containerRef} id="journal" className="relative w-full h-[500dvh] bg-[#050505]">
      
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">
        
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ display: "block" }} 
        />

        {/* Soft edge vignette protecting from harsh video borders */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050505_100%)] z-10" />

        {/* Floating Typography Story Overlays */}
        
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-20 max-w-6xl mx-auto px-6 lg:px-12">
            <div 
                ref={quote1Ref} 
                className="w-full max-w-lg transition-all duration-1000 ease-out opacity-0 translate-y-8"
            >
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                    <span className="text-[#FF1744] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Chapter 1</span>
                    <h3 className="text-3xl md:text-5xl font-light text-white mb-4 italic tracking-tight">
                        "The pursuit of perfection <br/><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">is never finished."</span>
                    </h3>
                </div>
            </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-end pointer-events-none z-20 max-w-6xl mx-auto px-6 lg:px-12 text-right">
            <div 
                ref={quote2Ref} 
                className="w-full max-w-lg transition-all duration-1000 ease-out opacity-0 translate-y-8"
            >
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl inline-block">
                    <span className="text-[#FF1744] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block text-right">Chapter 2</span>
                    <h3 className="text-3xl md:text-5xl font-light text-white mb-4 italic tracking-tight">
                        "Time, patience, and <br/>absolute purity."
                    </h3>
                </div>
            </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 text-center mt-[30vh]">
            <div 
                ref={quote3Ref} 
                className="max-w-xl transition-all duration-1000 ease-out opacity-0 translate-y-8"
            >
                <div className="bg-[#050505]/40 backdrop-blur-xl border border-white/10 p-8 px-12 rounded-[2rem] shadow-[0_0_50px_rgba(255,23,68,0.1)]">
                    <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-2">
                        Liquid <span className="font-semibold">Gold.</span>
                    </h3>
                    <p className="text-white/40 tracking-widest uppercase text-xs">A class of its own.</p>
                </div>
            </div>
        </div>


        {!isFullyLoaded && (
            <div className="absolute top-24 right-8 z-50 text-white/40 text-[10px] uppercase tracking-widest bg-black/40 px-4 py-2 backdrop-blur-md rounded-full border border-white/10 pointer-events-none">
            Loading Journal: {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
        )}

      </div>
    </section>
  );
}

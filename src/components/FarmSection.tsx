"use client";

import { useEffect, useRef, useState } from "react";

const storySteps = [
  {
    id: "01",
    subtitle: "The Genesis",
    title: "Rooted in Soil.",
    description: "It begins in the lush, organic valleys where the air is crisp. We nurture our strawberry plants over months using only natural soil, free from chemicals.",
    img: "/images/strawberry_soil_farm_1776493836419.png"
  },
  {
    id: "02",
    subtitle: "The Harvest",
    title: "Handpicked at Dawn.",
    description: "To lock in peak sweetness, we harvest strictly between 5:00 AM and 7:00 AM. Each berry is individually inspected by hand, selecting only the glowing perfect cuts.",
    img: "/images/hands_picking_strawberry_1776493871397.png"
  },
  {
    id: "03",
    subtitle: "The Extraction",
    title: "Cold-Pressed.",
    description: "Our state-of-the-art cold-press extraction gently massages the fruit, preserving raw enzymes, vitamins, and vivid redness without destructive heat.",
    img: "/images/strawberry_cold_press_1776493890133.png"
  },
  {
    id: "04",
    subtitle: "The Result",
    title: "Bottled Pure.",
    description: "Zero added water. Zero artificial sugars. From the morning dew on the farm to the chilled premium glass bottle in your hand in strictly under 48 hours.",
    img: "/images/luxury_strawberry_bottle_1776494067994.png"
  }
];

export default function FarmSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleIndices((prev) => new Set(prev).add(index));
          }
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".story-step");
    elements.forEach((el) => ob.observe(el));

    return () => ob.disconnect();
  }, []);

  return (
    <section ref={containerRef} id="our-farm" className="relative w-full bg-[#050505] py-24 lg:py-32 overflow-hidden border-t border-white/5">
      
      {/* Background ambient light */}
      <div className="absolute top-[20%] left-[20%] w-[40rem] h-[40rem] bg-[#FF1744]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="mb-16 md:mb-24 max-w-2xl">
          <h4 className="text-[#FF1744] font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4">Our Origins</h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]">
            From seeds to sip, <br/>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]">the anatomy of perfection.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 relative">
          
          {/* Subtle vertical connection line */}
          <div className="absolute left-[24px] md:left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

          {storySteps.map((step, index) => {
            const isVisible = visibleIndices.has(index);
            const isEven = index % 2 === 0;

            return (
              <div 
                key={step.id} 
                data-index={index}
                className={`story-step group flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Massive Premium Image Block */}
                <div className={`w-full lg:w-1/2 flex ${isEven ? 'justify-start' : 'justify-end'} relative`}>
                  <div className={`w-full transition-all duration-[1200ms] ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    
                    <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/10 w-full max-w-full lg:max-w-[700px] aspect-[4/5] sm:aspect-square lg:aspect-[16/11] flex items-center justify-center backdrop-blur-sm group-hover:border-[#FF1744]/40 transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group-hover:shadow-[0_20px_60px_rgba(255,23,68,0.2)]">
                      
                      {/* High-Resolution Fully Visible Image */}
                      <img 
                        src={step.img} 
                        alt={step.title}
                        className="absolute inset-0 w-full h-full object-cover scale-[1.03] transition-transform duration-[3000ms] ease-out group-hover:scale-[1.1]"
                      />
                      
                      {/* Subtle Vignette - completely minimal, no harsh darkening */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(5,5,5,0.4)_100%)] pointer-events-none" />

                    </div>
                  </div>
                </div>

                {/* Scaled Text Description Block */}
                <div className={`w-full lg:w-1/2 flex flex-col ${isEven ? 'items-end text-right' : 'items-start text-left'}`}>
                  <div 
                    className={`max-w-lg transition-all duration-[1200ms] delay-200 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                  >
                    <span className="text-[#FF6B9D] text-sm font-bold tracking-[0.3em] uppercase mb-4 block flex items-center gap-4">
                      {isEven ? (
                        <>{step.subtitle} <span className="text-white/20">| {step.id}</span></>
                      ) : (
                        <><span className="text-white/20">{step.id} |</span> {step.subtitle}</>
                      )}
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-lg lg:text-xl leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

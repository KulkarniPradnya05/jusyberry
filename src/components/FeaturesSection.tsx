"use client";
import { useEffect, useRef } from "react";

const features = [
  { title: "Organic Growth", icon: "🌱", desc: "No pesticides, completely natural and safe." },
  { title: "Hand Picked", icon: "👐", desc: "Selected at peak ripeness for maximum flavor." },
  { title: "Precision Wash", icon: "💧", desc: "Cleansed with care to preserve every nutrient." },
  { title: "Farm to Table", icon: "🚜", desc: "Delivered fresh within 24 hours of harvest." },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% is visible
    );

    const cards = sectionRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 text-white bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="feature-card flex flex-col items-center text-center p-10 rounded-2xl bg-white/[0.01] border border-[#FF1744]/20 shadow-[0_0_15px_-5px_rgba(255,23,68,0.15)] hover:border-[#FF1744]/70 hover:shadow-[0_0_35px_rgba(255,23,68,0.4)] hover:-translate-y-2 transition-all duration-500 ease-out opacity-0 translate-y-12 w-full"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="text-4xl mb-6 opacity-90 drop-shadow-sm">{feat.icon}</div>
              <h3 className="text-xl tracking-wide font-medium mb-3 text-[#FF1744]">{feat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-light">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

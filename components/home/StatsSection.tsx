"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 12, suffix: "", label: "ans d'expertise" },
  { value: 500, suffix: "+", label: "réalisations" },
  { value: 10, suffix: "", label: "ans de garantie" },
  { value: 72, suffix: "h", label: "devis remis" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = countersRef.current[i];
        if (!el) return;

        const counter = { val: 0 };
        gsap.fromTo(
          counter,
          { val: 0 },
          {
            val: stat.value,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = Math.round(counter.val).toString() + stat.suffix;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-noir-bois py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
              <div className="font-serif text-dore text-3xl md:text-4xl mb-1">
                <span ref={(el) => { countersRef.current[i] = el; }}>0{stat.suffix}</span>
              </div>
              <div className="label-upper text-white/50 text-[9px] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

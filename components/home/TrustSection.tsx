"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const iconProps = {
  width: 32,
  height: 32,
  fill: "none",
  stroke: "#c8a96e",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ShieldIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LeafIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const FileTextIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const AwardIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const TRUST: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: "Assurance décennale MMA",
    desc: "Responsabilité Civile & Décennale auprès des Mutuelles du Mans. Garantie 10 ans sur tous les ouvrages.",
    icon: <ShieldIcon />,
  },
  {
    title: "Bois certifiés durables",
    desc: "Essences issues de forêts gérées durablement au Brésil. Ipé, Cumaru, Teck labellisés.",
    icon: <LeafIcon />,
  },
  {
    title: "Devis en 72h — Gratuit",
    desc: "Étude personnalisée remise en 72h. Disponible du lundi au samedi de 8h à 19h.",
    icon: <FileTextIcon />,
  },
  {
    title: "Notre Passion, Notre Métier",
    desc: "12 ans d'expertise. Équipe qualifiée, pointilleuse, créative et fière de son travail.",
    icon: <AwardIcon />,
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".trust-item");
      if (!items) return;

      gsap.fromTo(
        Array.from(items),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-beige py-14 border-t border-beige-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST.map((item) => (
            <div key={item.title} className="trust-item opacity-0 flex flex-col items-center text-center gap-3 py-4 px-2">
              <span>{item.icon}</span>
              <h3 className="text-noir-bois font-serif">{item.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

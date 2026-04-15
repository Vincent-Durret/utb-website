"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const STEPS = [
  {
    num: "1",
    title: "Étude",
    desc: "Prise de cotes et examen du terrain, calcul des hauteurs sous fenêtres, prise de photos du lieu, étude pour décaissement éventuel et plans.",
  },
  {
    num: "2",
    title: "Mise en place",
    desc: "Gestion administrative, décaissement éventuel, mise en place de la structure, pose des lames et ponçage intégral de la terrasse.",
  },
  {
    num: "3",
    title: "Livraison",
    desc: "Réception des travaux ensemble. Le devis est dit « fourni posé » — nous fournissons le bois choisi et procédons à l'installation.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      // Draw SVG line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // Stagger steps
      if (stepsRef.current?.children) {
        gsap.fromTo(
          Array.from(stepsRef.current.children),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-creme py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="label-upper text-brun text-[9px] mb-3">Comment ça se passe</div>
          <h2 className="text-noir-bois text-3xl md:text-4xl">
            Nous sommes présents du début<br className="hidden md:block" /> à la fin de votre projet
          </h2>
          <div className="dore-line mx-auto mt-4" />
        </div>

        <div className="relative">
          {/* SVG connecting line (desktop) */}
          <div className="absolute top-7 left-[16%] right-[16%] hidden md:block h-px">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="0" y1="0" x2="100%" y2="0"
                stroke="#c8a96e"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {STEPS.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center opacity-0">
                <div className="w-14 h-14 rounded-full bg-dore flex items-center justify-center mb-6 relative z-10">
                  <span className="font-serif text-noir-bois text-xl">{step.num}</span>
                </div>
                <h3 className="text-noir-bois font-serif text-lg mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assurance note */}
        <div className="mt-14 bg-beige border border-beige-card p-6 text-center max-w-2xl mx-auto">
          <p className="text-muted text-xs leading-relaxed">
            Nos ouvrages résistent au temps qui passe. Notre activité est couverte en
            <strong className="text-noir-bois"> Responsabilité Civile</strong> et{" "}
            <strong className="text-noir-bois">Responsabilité Civile Décennale</strong> auprès des
            Mutuelles du Mans (MMA).
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { autoAlpha: 0, scale: 0.97 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
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
    <section ref={sectionRef} className="bg-brun py-20">
      <div ref={innerRef} className="max-w-3xl mx-auto px-6 text-center opacity-0">
        <div className="label-upper text-beige-card/60 text-[9px] mb-4">Votre projet commence ici</div>
        <h2 className="text-creme text-3xl md:text-4xl mb-4">Demandez à être rappelé</h2>
        <div className="dore-line mx-auto mb-6" />
        <p className="text-creme/70 text-sm leading-relaxed mb-8">
          Un conseiller vous rappelle immédiatement.<br />
          Disponible du lundi au samedi de 8h00 à 19h00.<br />
          Pour les particuliers, entreprises et collectivités, nous nous engageons à vous remettre
          une étude personnalisée dans les 72 heures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/devis/contact"
            className="bg-dore text-noir-bois label-upper px-10 py-4 font-semibold hover:bg-creme transition-colors"
          >
            Nous contacter →
          </Link>
          <a
            href="tel:+33755625251"
            className="border border-dore text-dore label-upper px-10 py-4 hover:bg-dore hover:text-noir-bois transition-colors"
          >
            07 55 62 52 51
          </a>
        </div>
        <p className="text-creme/40 text-xs mt-8">
          1503 Route des Dolines · 06560 Valbonne – Sophia Antipolis
        </p>
      </div>
    </section>
  );
}

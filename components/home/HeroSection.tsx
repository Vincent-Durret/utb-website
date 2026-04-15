"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(SplitText);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Title with SplitText
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "lines" });
        tl.fromTo(
          split.lines,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Golden line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.3"
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      // CTAs
      tl.fromTo(
        ctasRef.current?.children ?? [],
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/accueil/1-meilleur-artisant-terrasse-bois-nice-mandelieu-fayence-2048x1366.jpeg"
          alt="Terrasse bois sur pilotis Côte d'Azur"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-noir-footer/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div ref={taglineRef} className="opacity-0 mb-5">
          <span className="label-upper text-dore text-[9px]">
            Alpes-Maritimes · Var
          </span>
        </div>

        <h1 ref={titleRef} className="text-creme text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
          Spécialiste terrasses<br />
          <em className="not-italic text-beige-card">bois sur pilotis</em>
        </h1>

        <div ref={lineRef} className="dore-line mx-auto mb-6" />

        <p ref={subtitleRef} className="opacity-0 text-beige text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
          Vous souhaitez une terrasse de qualité, raffinée, élégante et durable ?
          Faites appel à nous. Votre Satisfaction est notre Satisfaction.
        </p>

        <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/realisations"
            className="border border-dore text-dore label-upper px-8 py-3.5 hover:bg-dore hover:text-noir-bois transition-colors"
          >
            Nos réalisations
          </Link>
          <Link
            href="/devis/contact"
            className="bg-dore text-noir-bois label-upper px-8 py-3.5 font-semibold hover:bg-creme transition-colors"
          >
            Devis gratuit
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-creme/40">
        <span className="label-upper text-[8px]">Découvrir</span>
        <div className="w-px h-10 bg-creme/20 animate-pulse" />
      </div>
    </section>
  );
}

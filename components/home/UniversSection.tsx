"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function UniversSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text slide in
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-creme py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src="/images/accueil/1-meilleur-artisant-terrasse-bois-nice-mandelieu-fayence-2048x1366.jpeg"
            alt="Terrasse bois côte d'Azur — Univers Terrasses Bois"
            fill
            className="object-cover"
            sizes="(max-width: 1920px) 100vw, 50vw"
            loading="eager"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="opacity-0">
          <div className="label-upper text-brun text-[9px] mb-3">Notre savoir-faire</div>
          <h2 className="text-noir-bois mb-4">
            L&apos;Univers de la<br />Terrasse bois
          </h2>
          <div className="dore-line mb-6" />
          <p className="text-muted mb-4">
            L&apos;Entreprise <strong className="text-dore">Univers Terrasses Bois</strong> basée sur Sophia Antipolis intervient principalement dans les
            Alpes-Maritimes (06) et le Var (83). Menton, Monaco, Nice, Cannes, Mandelieu,
            Fréjus, St Tropez… Nous nous adaptons à chaque terrain et configuration.
          </p>
          <p className="text-muted">
          N’hésitez pas à nous consulter, nous sommes disponibles quand vous l’êtes et à l’écoute de vos désirs. Nous vous apportons les solutions peu importe la difficulté et les contraintes de votre terrain, nous adaptons votre terrasse à sa configuration et respectons votre environnement. Faites vous plaisir dès maintenant !
          </p>
        </div>
      </div>
    </section>
  );
}

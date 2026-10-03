"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_LABELS: Record<string, string> = {
  "terrasses-bois": "Terrasse en bois",
  "sur-pilotis": "Sur pilotis",
  "pergolas": "Pergola",
  "piscines": "Terrasse piscine",
  "amenagements": "Aménagement extérieur",
  "teck": "Toiture teck",
};

// Normalized type — resolved image URLs passed from server
export type RealisationPreview = {
  id: string;
  title: string;
  location: string;
  service: string;
  mainImageUrl: string;
  thumbImageUrl: string;
};

// Static fallback when Sanity has no content yet
const FALLBACKS: RealisationPreview[] = [
  {
    id: "1",
    title: "Terrasse sur pilotis",
    location: "Nice",
    service: "sur-pilotis",
    mainImageUrl: "/images/accueil/1-meilleur-artisant-terrasse-bois-nice-mandelieu-fayence-2048x1366.jpeg",
    thumbImageUrl: "/images/accueil/1-meilleur-artisant-terrasse-bois-nice-mandelieu-fayence-2048x1366.jpeg",
  },
  {
    id: "2",
    title: "Terrasse bois Mougins",
    location: "Mougins",
    service: "terrasses-bois",
    mainImageUrl: "/images/accueil/2-terrasse_bois_cote_dazur-q81nzb2ayi05arp3jv34us63519my0n4pnc2cuuoac.jpg",
    thumbImageUrl: "/images/accueil/2-terrasse_bois_cote_dazur-q81nzb2ayi05arp3jv34us63519my0n4pnc2cuuoac.jpg",
  },
  {
    id: "3",
    title: "Pergola Sophia Antipolis",
    location: "Sophia Antipolis",
    service: "pergolas",
    mainImageUrl: "/images/accueil/2-terrasse_bois_cote_dazur-q81nzb2ayi05arp3jv34us63519my0n4pnc2cuuoac.jpg",
    thumbImageUrl: "/images/accueil/2-terrasse_bois_cote_dazur-q81nzb2ayi05arp3jv34us63519my0n4pnc2cuuoac.jpg",
  },
];

interface Props {
  realisations?: RealisationPreview[];
}

export default function RealisationsStrip({ realisations }: Props) {
  const data = (realisations && realisations.length > 0) ? realisations : FALLBACKS;

  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioning = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mainPhotoRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const active = data[activeIndex];

  // Entrance animation
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const handleThumbClick = (i: number) => {
    if (i === activeIndex || isTransitioning.current) return;

    if (reducedMotion) {
      setActiveIndex(i);
      return;
    }

    isTransitioning.current = true;
    gsap.to(mainPhotoRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(i);
        gsap.to(mainPhotoRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => { isTransitioning.current = false; },
        });
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-noir-bois py-20"
      style={reducedMotion ? undefined : { opacity: 0 }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="label-upper text-dore text-[9px] mb-3" aria-hidden="true">Portfolio</div>
          <h2 className="text-creme">Nos dernières réalisations</h2>
          <div className="dore-line mx-auto mt-4" aria-hidden="true" />
        </div>

        {/* Main featured photo */}
        <div
          ref={mainPhotoRef}
          className="relative w-full aspect-video overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <Image
            key={active.id}
            src={active.mainImageUrl}
            alt={active.title}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority={activeIndex === 0}
          />

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir-footer/80 via-transparent to-transparent" />

          {/* Info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
            <div>
              {active.service && (
                <div className="label-upper text-dore text-[9px] mb-2">
                  {SERVICE_LABELS[active.service] ?? active.service}
                </div>
              )}
              <h3 className="text-creme font-serif">
                {active.title}
              </h3>
              {active.location && (
                <p className="text-creme/60 text-xs mt-1">{active.location}</p>
              )}
            </div>
            <Link
              href="/realisations"
              className="flex-shrink-0 border border-dore/60 text-dore label-upper text-[9px] px-4 py-2.5 hover:bg-dore hover:text-noir-bois transition-colors"
            >
              Voir →
            </Link>
          </div>
        </div>

        {/* Thumbnails row */}
        <div
          ref={thumbsRef}
          className="flex gap-2 mt-2"
          role="tablist"
          aria-label="Sélectionner une réalisation"
        >
          {data.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={r.title}
              onClick={() => handleThumbClick(i)}
              className={`relative flex-1 aspect-video overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dore ${
                i === activeIndex
                  ? "ring-2 ring-dore opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={r.thumbImageUrl}
                alt={r.title}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/realisations"
            className="inline-block border border-dore text-dore label-upper px-8 py-3 hover:bg-dore hover:text-noir-bois transition-colors"
          >
            Toutes nos réalisations →
          </Link>
        </div>

      </div>
    </section>
  );
}

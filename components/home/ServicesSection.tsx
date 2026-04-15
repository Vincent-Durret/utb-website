"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Terrasses en bois",
    desc: "Ipé, Cumaru, Teck. Esthétique chaleureuse, durabilité exceptionnelle et grande polyvalence d'aménagement. Visserie inox, ponçage intégral en fin de chantier.",
    href: "/services/terrasses-en-bois",
  },
  {
    num: "02",
    title: "Terrasses sur pilotis",
    desc: "Terrain en pente ou espace non accessible ? La terrasse sur pilotis s'adapte à toutes les configurations et vous permet d'agrandir votre surface habitable.",
    href: "/services/terrasses-sur-pilotis",
  },
  {
    num: "03",
    title: "Pergolas & abris voitures",
    desc: "Abris voitures, pergolas, jardinières, ponts japonais, abris de jardin… Bois massif, conception sur mesure, finitions soignées.",
    href: "/services/pergolas",
  },
  {
    num: "04",
    title: "Terrasses piscines & jardins",
    desc: "Les terrasses en bois épousent les contours de votre piscine et créent une plage pour la détente. Essences résistantes à l'humidité et aux traitements chlorés.",
    href: "/services/terrasses-piscines-jardins",
  },
  {
    num: "05",
    title: "Aménagements extérieurs",
    desc: "Garde-corps, luminaires, jardinières, clôtures, portails bois. Chaque élément conçu pour s'intégrer harmonieusement à votre terrasse.",
    href: "/services/amenagements-exterieurs",
  },
  {
    num: "06",
    title: "Toiture en teck",
    desc: "Le teck, bois noble par excellence. Résistant, naturellement huilé, il offre une longévité remarquable pour vos toitures et bardages extérieurs.",
    href: "/services/toiture-en-teck",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const descRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  // Entrance animation — rows slide in from left, staggered
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const rows = listRef.current?.querySelectorAll(".service-row");
      if (!rows) return;
      gsap.fromTo(
        Array.from(rows),
        { autoAlpha: 0, x: -24 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const toggle = (i: number) => {
    const prev = active;
    setActive(active === i ? null : i);

    if (reducedMotion) return;

    // Close previous
    if (prev !== null && descRefs.current[prev]) {
      gsap.to(descRefs.current[prev], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    // Open new
    if (active !== i && descRefs.current[i]) {
      gsap.fromTo(
        descRefs.current[i],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.38, ease: "power2.inOut" }
      );
    }
  };

  return (
    <section ref={sectionRef} className="bg-beige py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="label-upper text-brun text-[9px] mb-3" aria-hidden="true">
            Ce que nous faisons
          </div>
          <h2 className="text-noir-bois text-3xl md:text-4xl">Nos services</h2>
          <div className="dore-line mx-auto mt-4" aria-hidden="true" />
        </div>

        {/* Editorial numbered list */}
        <div ref={listRef} role="list">
          {SERVICES.map((s, i) => {
            const isOpen = active === i;
            const descId = `service-desc-${i}`;
            const btnId = `service-btn-${i}`;

            return (
              <div key={s.href} className="service-row opacity-0" role="listitem">
                <button
                  id={btnId}
                  className="w-full flex items-center justify-between py-5 border-t border-beige-card group text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={descId}
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <span
                      className="label-upper text-dore text-[9px] flex-shrink-0 w-5"
                      aria-hidden="true"
                    >
                      {s.num}
                    </span>
                    <span
                      className={`font-serif text-lg md:text-xl transition-colors duration-200 ${
                        isOpen ? "text-brun" : "text-noir-bois group-hover:text-brun"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`text-dore text-xl leading-none flex-shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={descId}
                  ref={(el) => {
                    descRefs.current[i] = el;
                  }}
                  role="region"
                  aria-labelledby={btnId}
                  className="overflow-hidden"
                  style={{
                    height: reducedMotion ? (isOpen ? "auto" : 0) : 0,
                    opacity: reducedMotion ? (isOpen ? 1 : 0) : 0,
                  }}
                >
                  <div className="pl-11 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-10">
                    <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                    <Link
                      href={s.href}
                      className="flex-shrink-0 label-upper text-brun text-[9px] border-b border-brun pb-0.5 hover:text-dore hover:border-dore transition-colors self-start"
                    >
                      Découvrir →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Closing border */}
          <div className="border-t border-beige-card" aria-hidden="true" />
        </div>

        <div className="text-center mt-12">
          <Link
            href="/nos-services"
            className="inline-block border-b border-brun text-brun label-upper text-[9px] pb-0.5 hover:text-dore hover:border-dore transition-colors"
          >
            Voir tous nos services →
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const COMMENT_LIMIT = 160;

export type AvisItem = {
  _id: string;
  authorName: string;
  rating: number;
  comment: string;
  date?: string;
};

type Props = {
  avis: AvisItem[];
  googleUrl?: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={i < rating ? "text-dore" : "text-beige-card"}
        >
          <path
            fill="currentColor"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return null;
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return null;
  }
}

function truncateComment(text: string, limit: number) {
  if (text.length <= limit) return text;
  const slice = text.slice(0, limit);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trimEnd()}…`;
}

function AvisCard({
  item,
  animate,
}: {
  item: AvisItem;
  animate: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = item.comment.length > COMMENT_LIMIT;
  const displayed =
    !needsTruncate || expanded
      ? item.comment
      : truncateComment(item.comment, COMMENT_LIMIT);
  const dateLabel = formatDate(item.date);

  return (
    <blockquote
      className={`avis-item flex flex-col gap-4${animate ? " opacity-0" : ""}`}
    >
      <Stars rating={item.rating} />
      <div className="flex-1">
        <p className="text-muted">« {displayed} »</p>
        {needsTruncate && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 label-upper text-[9px] text-brun hover:text-dore transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
      <footer className="pt-3 border-t border-beige-card">
        <cite className="not-italic text-noir-bois font-serif text-base">
          {item.authorName}
        </cite>
        {dateLabel && (
          <p className="text-muted text-xs mt-0.5 capitalize">{dateLabel}</p>
        )}
      </footer>
    </blockquote>
  );
}

export default function AvisSection({ avis, googleUrl }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || avis.length === 0) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".avis-item");
      if (!items?.length) return;

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
  }, [avis.length, reducedMotion]);

  if (avis.length === 0) return null;

  const avg =
    Math.round(
      (avis.reduce((sum, a) => sum + a.rating, 0) / avis.length) * 10
    ) / 10;

  return (
    <section ref={sectionRef} className="bg-creme py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="label-upper text-brun text-[9px] mb-3">Avis clients</div>
          <h2 className="text-noir-bois">
            Ce que disent nos clients
          </h2>
          <div className="dore-line mx-auto mt-4" />
          <div className="mt-5 flex items-center justify-center gap-3 text-muted">
            <Stars rating={Math.round(avg)} />
            <span>
              <span className="text-noir-bois font-medium">{avg}</span>
              {" / 5 · "}
              {avis.length} avis sélectionné{avis.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {avis.map((item) => (
            <AvisCard
              key={item._id}
              item={item}
              animate={!reducedMotion}
            />
          ))}
        </div>

        {googleUrl && (
          <div className="mt-14 text-center">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block inline-flex gap-2 items-center border-b border-brun text-brun label-upper text-[9px] pb-0.5 hover:text-dore hover:border-dore transition-colors"
            >
              Voir tous les avis sur Google
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

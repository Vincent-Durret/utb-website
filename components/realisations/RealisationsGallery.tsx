"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const SERVICE_LABELS: Record<string, string> = {
  "terrasses-bois": "Terrasses en bois",
  "sur-pilotis": "Sur pilotis",
  "pergolas": "Pergolas",
  "abris-de-voiture": "Abris de voiture",
  "piscines": "Piscines",
  "amenagements": "Aménagements",
  "teck": "Teck",
};

const FILTERS: Array<{ label: string; value: string | null }> = [
  { label: "Tout voir", value: null },
  { label: "Terrasses en bois", value: "terrasses-bois" },
  { label: "Terrasses sur pilotis", value: "sur-pilotis" },
  { label: "Aménagements en bois", value: "amenagements" },
  { label: "Abris de voitures", value: "abris-de-voiture" },
  { label: "Pergolas", value: "pergolas" },
];

export type RealisationItem = {
  _id: string;
  title: string;
  location?: string;
  service?: string;
  images: Array<{ url: string; urlFull: string; alt: string }>;
};

type Props = { items: RealisationItem[] };

type CardVariant = "large" | "small" | "fill";

type CardProps = {
  item: RealisationItem;
  index: number;
  variant?: CardVariant;
  onOpen: (index: number) => void;
};

const VARIANT_CLASS: Record<CardVariant, string> = {
  large: "aspect-[3/2]",
  small: "aspect-[4/3]",
  fill: "aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-0",
};

function RealisationCard({ item, index, variant = "small", onOpen }: CardProps) {
  const isLarge = variant === "large";
  const [ref, inView] = useInView<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      onClick={() => onOpen(index)}
      style={{ transitionDelay: inView ? `${(index % 3) * 90}ms` : "0ms" }}
      className={`group relative overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-dore focus-visible:outline-offset-2 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.96]"
      } ${VARIANT_CLASS[variant]}`}
      aria-label={`Voir ${item.title} en plein écran`}
    >
      <div className="relative h-full w-full overflow-hidden">
        {item.images[0] ? (
          <Image
            src={item.images[0].url}
            alt={item.images[0].alt}
            fill
            priority={index < 3}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 75vw"
                : "(max-width: 768px) 100vw, 25vw"
            }
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-beige" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-noir-footer/75 via-noir-footer/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        {item.service && (
          <div className="absolute top-3 left-3">
            <span className="label-upper text-[9px] text-creme bg-dore/90 px-2 py-1">
              {SERVICE_LABELS[item.service] ?? item.service}
            </span>
          </div>
        )}

        {item.images.length > 1 && (
          <div className="absolute top-3 right-3">
            <span className="label-upper text-[9px] text-creme bg-noir-footer/60 px-2 py-1">
              {item.images.length} photos
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
          <h2
            className="text-creme font-serif text-titre-secondaire"
          >
            {item.title}
          </h2>
          {item.location && (
            <p className="text-creme/70 text-xs mt-1 flex items-center gap-1">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                <path
                  d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z"
                  fill="currentColor"
                />
              </svg>
              {item.location}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

function chunkItems<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function RealisationsGallery({ items: allItems }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const items = selectedService
    ? allItems.filter((item) => item.service === selectedService)
    : allItems;

  const selectFilter = useCallback((value: string | null) => {
    setSelectedService(value);
    setOpenIdx(null);
    setImgIdx(0);
  }, []);

  const current = openIdx !== null ? items[openIdx] : null;
  const totalImages = current?.images.length ?? 0;

  const close = useCallback(() => {
    setOpenIdx(null);
    setImgIdx(0);
  }, []);

  const prev = useCallback(() => {
    if (openIdx === null) return;
    if (imgIdx > 0) {
      setImgIdx((i) => i - 1);
    } else {
      const prevIdx = (openIdx - 1 + items.length) % items.length;
      setOpenIdx(prevIdx);
      setImgIdx(items[prevIdx].images.length - 1);
    }
  }, [openIdx, imgIdx, items]);

  const next = useCallback(() => {
    if (openIdx === null) return;
    if (imgIdx < totalImages - 1) {
      setImgIdx((i) => i + 1);
    } else {
      const nextIdx = (openIdx + 1) % items.length;
      setOpenIdx(nextIdx);
      setImgIdx(0);
    }
  }, [openIdx, imgIdx, totalImages, items]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, prev, next]);

  const open = useCallback((index: number) => {
    setOpenIdx(index);
    setImgIdx(0);
  }, []);

  if (allItems.length === 0) {
    return (
      <div className="text-center py-20 text-muted">
        <p>Les réalisations seront bientôt disponibles.</p>
      </div>
    );
  }

  const indexed = items.map((item, index) => ({ item, index }));
  const groups = chunkItems(indexed, 3);

  return (
    <>
      <div className="py-6 md:py-7">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {FILTERS.map((filter) => {
            const isActive = selectedService === filter.value;
            return (
              <button
                key={filter.label}
                onClick={() => selectFilter(filter.value)}
                aria-pressed={isActive}
                className={`text-sm md:text-base font-medium pb-1 cursor-pointer border-b transition-colors ${
                  isActive
                    ? "text-dore border-dore"
                    : "text-brun border-transparent hover:text-dore"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="bg-creme py-16">
        <div className="max-w-7xl mx-auto px-6">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted">
              <p>Aucune réalisation dans cette catégorie pour l&apos;instant.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {groups.map((group, groupIdx) => {
                const largeLeft = groupIdx % 2 === 0;

                // Groupe incomplet (fin de liste) : grille simple
                if (group.length < 3) {
                  return (
                    <div
                      key={`group-${groupIdx}`}
                      className={`grid grid-cols-1 gap-3 ${
                        group.length === 2 ? "md:grid-cols-2" : ""
                      }`}
                    >
                      {group.map(({ item, index }) => (
                        <RealisationCard
                          key={item._id}
                          item={item}
                          index={index}
                          variant={group.length === 1 ? "large" : "small"}
                          onOpen={open}
                        />
                      ))}
                    </div>
                  );
                }

                const large = largeLeft ? group[0] : group[2];
                const smalls = largeLeft ? group.slice(1) : group.slice(0, 2);

                return (
                  <div
                    key={`group-${groupIdx}`}
                    className={`grid grid-cols-1 gap-3 md:items-stretch ${
                      largeLeft ? "md:grid-cols-[3fr_1fr]" : "md:grid-cols-[1fr_3fr]"
                    }`}
                  >
                    {largeLeft && (
                      <RealisationCard
                        item={large.item}
                        index={large.index}
                        variant="large"
                        onOpen={open}
                      />
                    )}

                    <div className="flex flex-col gap-3 md:h-full">
                      {smalls.map(({ item, index }) => (
                        <RealisationCard
                          key={item._id}
                          item={item}
                          index={index}
                          variant="fill"
                          onOpen={open}
                        />
                      ))}
                    </div>

                    {!largeLeft && (
                      <RealisationCard
                        item={large.item}
                        index={large.index}
                        variant="large"
                        onOpen={open}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {openIdx !== null && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-noir-footer/95"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            {current.images[imgIdx] && (
              <Image
                src={current.images[imgIdx].urlFull}
                alt={current.images[imgIdx].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                loading="eager"
              />
            )}
          </div>

          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-creme/80 hover:text-creme transition-colors p-2"
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-creme/80 hover:text-creme transition-colors p-3"
            aria-label="Précédent"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-creme/80 hover:text-creme transition-colors p-3"
            aria-label="Suivant"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-noir-footer to-transparent pointer-events-none">
            <div className="max-w-2xl mx-auto text-center">
              {current.service && (
                <span className="label-upper text-[9px] text-creme bg-dore/90 px-2 py-1 inline-block mb-2">
                  {SERVICE_LABELS[current.service] ?? current.service}
                </span>
              )}
              <h3 className="text-creme font-serif">{current.title}</h3>
              {current.location && (
                <p className="text-creme/60 text-xs mt-1">{current.location}</p>
              )}
              {totalImages > 1 && (
                <p className="text-creme/40 text-xs mt-2">{imgIdx + 1} / {totalImages}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

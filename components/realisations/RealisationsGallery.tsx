"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const SERVICE_LABELS: Record<string, string> = {
  "terrasses-bois": "Terrasses en bois",
  "sur-pilotis": "Sur pilotis",
  "pergolas": "Pergolas",
  "piscines": "Piscines",
  "amenagements": "Aménagements",
  "teck": "Teck",
};

export type RealisationItem = {
  _id: string;
  title: string;
  location?: string;
  service?: string;
  images: Array<{ url: string; urlFull: string; alt: string }>;
};

type Props = { items: RealisationItem[] };

export default function RealisationsGallery({ items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

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

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-muted">
        <p className="text-sm">Les réalisations seront bientôt disponibles.</p>
      </div>
    );
  }

  return (
    <>
      {/* Galerie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((r, i) => (
          <button
            key={r._id}
            onClick={() => { setOpenIdx(i); setImgIdx(0); }}
            className={`group relative overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-dore focus-visible:outline-offset-2${i === 0 ? " sm:col-span-2 lg:col-span-2" : ""}`}
            aria-label={`Voir ${r.title} en plein écran`}
          >
            <div className={`relative overflow-hidden${i === 0 ? " aspect-[16/9]" : " aspect-[4/3]"}`}>
              {r.images[0] ? (
                <Image
                  src={r.images[0].url}
                  alt={r.images[0].alt}
                  fill
                  priority={i < 3}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                />
              ) : (
                <div className="w-full h-full bg-beige" />
              )}

              {/* Overlay dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir-footer/75 via-noir-footer/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Service tag */}
              {r.service && (
                <div className="absolute top-3 left-3">
                  <span className="label-upper text-[9px] text-creme bg-dore/90 px-2 py-1">
                    {SERVICE_LABELS[r.service] ?? r.service}
                  </span>
                </div>
              )}

              {/* Nombre d'images */}
              {r.images.length > 1 && (
                <div className="absolute top-3 right-3">
                  <span className="label-upper text-[9px] text-creme bg-noir-footer/60 px-2 py-1">
                    {r.images.length} photos
                  </span>
                </div>
              )}

              {/* Texte bas */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <h2 className={`text-creme font-serif leading-snug${i === 0 ? " text-xl md:text-2xl" : " text-base"}`}>
                  {r.title}
                </h2>
                {r.location && (
                  <p className="text-creme/70 text-xs mt-1 flex items-center gap-1">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor" />
                    </svg>
                    {r.location}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIdx !== null && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-noir-footer/95"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          {/* Conteneur image — stoppe la propagation du clic */}
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
              />
            )}
          </div>

          {/* Bouton fermer */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-creme/80 hover:text-creme transition-colors p-2"
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Flèche gauche */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-creme/80 hover:text-creme transition-colors p-3"
            aria-label="Précédent"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Flèche droite */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-creme/80 hover:text-creme transition-colors p-3"
            aria-label="Suivant"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Infos bas */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-noir-footer to-transparent pointer-events-none">
            <div className="max-w-2xl mx-auto text-center">
              {current.service && (
                <span className="label-upper text-[9px] text-creme bg-dore/90 px-2 py-1 inline-block mb-2">
                  {SERVICE_LABELS[current.service] ?? current.service}
                </span>
              )}
              <h3 className="text-creme font-serif text-lg md:text-xl">{current.title}</h3>
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

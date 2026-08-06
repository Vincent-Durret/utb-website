import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Nos services : Terrasse bois, Pergolas et Abris de voiture",
  description:
    "Découvrez toutes nos options pour la construction de vos terrasses et pergolas en bois à Nice, Antibes et Cannes et toute la région",
};

const SERVICE_CARDS = [
  {
    title: "Terrasses en bois",
    href: "/services/terrasses-en-bois",
    img: "/images/nos-services/1-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
  },
  {
    title: "Piscines et jardins",
    href: "/services/terrasses-piscines-jardins",
    img: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh",
  },
  {
    title: "Abris de voiture",
    href: "/services/abris-de-voiture",
    img: "/images/nos-services/3-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t",
  },
  {
    title: "Terrasses sur pilotis",
    href: "/services/terrasses-sur-pilotis",
    img: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4",
  },
  {
    title: "Aménagements extérieurs",
    href: "/services/amenagements-exterieurs",
    img: "/images/nos-services/5-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0",
  },
  {
    title: "Pergolas",
    href: "/services/pergolas",
    img: "/images/nos-services/6-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx",
  },
];

export default function NosServicesPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Ce que nous faisons</div>
        <h1 className="text-noir-bois text-4xl md:text-5xl">Nos services</h1>
        <div className="dore-line mx-auto mt-4 mb-6" />
        <p className="text-muted text-sm max-w-xl mx-auto px-6">
          Terrasses, pergolas, aménagements extérieurs — chaque projet sur mesure en Côte d&apos;Azur.
        </p>
      </div>

      {/* Grille */}
      <section className="bg-creme py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICE_CARDS.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                aria-label={`Découvrir nos ${card.title.toLowerCase()}`}
                className="group block relative aspect-[4/3] bg-beige overflow-hidden"
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-creme text-lg">{card.title}</h2>
                  <span className="label-upper text-dore text-[9px]">Découvrir →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

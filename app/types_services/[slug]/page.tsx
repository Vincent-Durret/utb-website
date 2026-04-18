import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";

type TypeServiceData = {
  title: string;
  h1: string;
  description: string;
  intro: string[];
  hero: string;
  gallery: { src: string; alt: string }[];
};

const TYPES_SERVICES: Record<string, TypeServiceData> = {
  "terrasses-bois": {
    title: "Terrasses en bois — Types et essences",
    h1: "Terrasses en bois",
    description: "Ipé, Cumaru, Itauba — découvrez nos essences de bois pour terrasses sur mesure en Côte d'Azur.",
    intro: [
      "Quel que soit votre projet, le bois est fait pour s'adapter à toutes les situations en vous assurant un confort et une longévité unique.",
      "Les bois exotiques tels que le Cumaru, l'Itauba et l'Ipé sont souvent recommandés pour leur durabilité et leur résistance. Naturellement imputrescibles et sans échardes, ils sont idéaux pour les terrasses extérieures exposées aux intempéries.",
      "Nous ponçons intégralement la terrasse en fin de chantier, pour une finition parfaite. Le devis est dit « fourni posé » : nous fournissons le bois choisi et procédons à l'installation.",
    ],
    hero: "/images/types_services_terrasses-bois/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse bois exotique" },
      { src: "/images/types_services_terrasses-bois/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Terrasse bois Fréjus Grasse" },
      { src: "/images/types_services_terrasses-bois/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Contour piscine bois Mougins" },
    ],
  },
  "terrasses-bois-sur-pilotis": {
    title: "Terrasses bois sur pilotis — Terrain en pente",
    h1: "Terrasses bois sur pilotis",
    description: "Terrain en pente, espace non accessible — la terrasse sur pilotis est la solution. Devis gratuit en 72h.",
    intro: [
      "Profitez d'un espace vert difficilement ou non accessible avec la terrasse bois sur pilotis. Agrandissez votre surface habitable grâce à ce procédé mis en œuvre par l'élévation de plots béton, de poteaux et d'une charpente porteuse.",
      "Notre bureau d'études calcule le dimensionnement de la structure pour recevoir une charge admissible. À plus d'un mètre du sol, la norme impose la mise en place de garde-corps — verre, plexiglas ou inox selon votre goût.",
      "Vous pouvez aussi profiter d'un espace de rangement étanche et éclairé sous la terrasse. La structure est réalisée en bois de Douglas, dont la résistance est reconnue.",
    ],
    hero: "/images/types_services_terrasses-bois-sur-pilotis/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois-sur-pilotis/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse pilotis terrain pente" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Spécialiste pilotis Fréjus" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Terrasse pilotis Nice Antibes" },
    ],
  },
  "abris-voitures-pergolas": {
    title: "Abris voitures & pergolas bois",
    h1: "Abris voitures & pergolas",
    description: "Abris voitures et pergolas en bois sur mesure — bois Douglas, design ou classique. Alpes-Maritimes et Var.",
    intro: [
      "Pour prendre soin de votre véhicule, pourquoi ne pas opter pour un carport en bois ? Votre voiture ou votre deux-roues sera parfaitement à l'abri de toutes intempéries. Réaliser un abri de voiture en bois apporte du cachet à votre maison.",
      "Nous réalisons la structure en bois de Douglas, dont la résistance et la durabilité ne sont plus à prouver. Des études en amont sont effectuées afin de tester la résistance au vent et au soulèvement.",
      "Outre leur fonctionnalité, les pergolas amènent un univers cocooning à votre jardin, un coin d'ombre idéal. Vous pouvez réaliser et concevoir des pergolas quel que soit l'espace et le lieu souhaité.",
    ],
    hero: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Abri voiture bois Nice Antibes" },
      { src: "/images/types_services_abris-voitures-pergolas/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Pergola bois Alpes Maritimes" },
      { src: "/images/types_services_abris-voitures-pergolas/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg", alt: "Abri pergola bois" },
    ],
  },
};

const PROCESSUS = [
  {
    num: "01",
    title: "Étude",
    desc: "Prise de cotes, examen du terrain, mesure des hauteurs, étude de portance et plans.",
  },
  {
    num: "02",
    title: "Mise en place",
    desc: "Gestion administrative, structure, pose des lames et ponçage intégral de la terrasse.",
  },
  {
    num: "03",
    title: "Livraison",
    desc: "Devis personnalisé en 72h. Déplacement du lundi au samedi de 8h à 19h.",
  },
];

export async function generateStaticParams() {
  return Object.keys(TYPES_SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = TYPES_SERVICES[slug];
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function TypeServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = TYPES_SERVICES[slug];
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <div className="relative h-80 md:h-[420px] bg-noir-bois">
        <Image
          src={service.hero}
          alt={service.h1}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="label-upper text-dore text-[9px] mb-3">Nos services</div>
          <h1 className="text-creme text-4xl md:text-5xl">{service.h1}</h1>
          <div className="dore-line mx-auto mt-4" />
        </div>
      </div>

      {/* Intro */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {service.intro.map((p) => (
            <p key={p.slice(0, 40)} className="text-muted text-sm leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Processus */}
      <section className="bg-beige py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="label-upper text-brun text-[9px] mb-3">Comment ça se passe</div>
            <h2 className="text-noir-bois text-3xl">Notre processus</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESSUS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-dore text-creme flex items-center justify-center mx-auto mb-4 label-upper text-[11px]">
                  {step.num}
                </div>
                <h3 className="text-noir-bois text-lg mb-2">{step.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-creme py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="label-upper text-brun text-[9px] mb-3">Photos</div>
            <h2 className="text-noir-bois text-3xl">Nos réalisations</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.gallery.map((img) => (
              <div key={img.src} className="relative aspect-[3/2] bg-beige overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

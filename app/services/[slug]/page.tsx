import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";

type ServiceData = {
  title: string;
  h1: string;
  description: string;
  intro: string[];
  hero: string;
  gallery: { src: string; alt: string }[];
};

const SERVICES: Record<string, ServiceData> = {
  "terrasses-en-bois": {
    title: "Terrasses en bois",
    h1: "Terrasses en bois",
    description: "Construction de terrasses en bois sur mesure en Alpes-Maritimes et Var. Ipé, Cumaru, Teck — essences durables, visserie inox.",
    intro: [
      "Vous souhaitez une terrasse de qualité, raffinée, élégante et durable ? À la fois chaleureuse et esthétique, la terrasse en bois apporte du charme et de l'authenticité à votre maison. Pour concevoir la terrasse de vos rêves, nous concevons ensemble votre projet afin de vous conseiller et vous apporter des solutions durables. Nous sommes disponibles quand vous l'êtes et à l'écoute de vos désirs.",
      "Nous vous apportons les solutions quelle que soit la difficulté et les contraintes de votre terrain. Nous adaptons votre terrasse à la configuration de votre espace et nous respectons votre environnement. Notre plus : nous ponçons intégralement votre terrasse en fin de chantier, pour une finition parfaite ! Réalisez vos envies dès maintenant, demandez-nous un devis.",
    ],
    hero: "/images/types_services_terrasses-bois/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse bois Côte d'Azur" },
      { src: "/images/types_services_terrasses-bois/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Terrasse bois sur pilotis" },
      { src: "/images/types_services_terrasses-bois/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Contour piscine bois" },
    ],
  },
  "terrasses-sur-pilotis": {
    title: "Terrasses sur pilotis",
    h1: "Terrasses bois sur pilotis",
    description: "Spécialiste terrasses bois sur pilotis en Côte d'Azur. Terrain en pente, espace non accessible — nous adaptons votre terrasse.",
    intro: [
      "Notre région présente une topographie très accidentée. Pour optimiser au maximum l'espace, nous proposons l'aménagement de terrasses bois sur pilotis. Ce procédé est mis en œuvre par l'élévation de plots béton, de poteaux et d'une charpente porteuse. Notre bureau d'études calcule le dimensionnement de la structure de la charpente pour recevoir une charge admissible. À plus d'un mètre du sol (voire 5 ou 6 mètres), la norme impose la mise en place de garde-corps. Pour ne pas occulter la vue, il est possible de mettre en place des panneaux de verre ou de plexiglas et d'allier le bois et l'inox pour une composition design.",
      "Une terrasse sur pilotis vous permet de profiter d'une place jusqu'alors inexploitée, d'avoir une vue plus dégagée sur votre environnement extérieur. Vous pouvez aussi profiter d'un espace de rangement étanche et même éclairé si vous le souhaitez sous la terrasse sur pilotis. La structure est réalisée en bois de Douglas.",
    ],
    hero: "/images/types_services_terrasses-bois-sur-pilotis/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois-sur-pilotis/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse sur pilotis" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Spécialiste pilotis" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Terrasse bois piscine" },
    ],
  },
  "terrasses-piscines-jardins": {
    title: "Piscines et jardins",
    h1: "Piscines et jardins",
    description: "Terrasses en bois autour de piscine et aménagement de jardins en bois. Spécialiste Côte d'Azur.",
    intro: [
      "Pour l'élaboration de votre terrasse de piscine, nous devons veiller à votre confort mais aussi votre sécurité. Pour cela, le bois présente plusieurs avantages : esthétique, antidérapant naturel, résistant à l'eau, longévité, facile d'entretien. Le bois exotique fait partie de nos matériaux pour la création de votre projet. En plus de donner du cachet à votre maison, il est naturellement imputrescible et dépourvu d'échardes.",
      "Entre jardin, terrasse et piscine, comment allier l'esthétisme à la fonctionnalité ? Nous concevons votre projet avec vous et nous vous présentons plusieurs maquettes créatives sur un même espace.",
    ],
    hero: "/images/nos-services/1-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Contour piscine bois" },
      { src: "/images/nos-services/3-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Aménagement bois jardin" },
      { src: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Terrasse jardin bois" },
    ],
  },
  "pergolas": {
    title: "Pergolas",
    h1: "Pergolas",
    description: "Construction de pergolas en bois sur mesure. Alpes-Maritimes et Var — devis gratuit en 72h.",
    intro: [
      "Vous pouvez réaliser et concevoir des pergolas quelle que soit l'espace et le lieu que vous souhaitez ! Sachez que nous possédons les compétences adéquates et que de plus nous y apportons notre créativité. Concevoir et réaliser une pergola à ossature bois sur un espace réduit, arrimée de façon quasi invisible — là aussi, le professionnel est prépondérant. Des études en amont sont effectuées afin de tester la résistance au vent, au soulèvement et autres contraintes.",
      "Outre leur fonctionnalité, les pergolas amènent un univers cocooning à votre jardin, un coin d'ombre où déjeuner par exemple.",
    ],
    hero: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Abri voiture bois" },
      { src: "/images/types_services_abris-voitures-pergolas/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Pergola bois sur mesure" },
      { src: "/images/types_services_abris-voitures-pergolas/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Aménagement bois extérieur" },
    ],
  },
  "amenagements-exterieurs": {
    title: "Aménagements extérieurs",
    h1: "Aménagements extérieurs",
    description: "Garde-corps, luminaires, jardinières, clôtures — tous vos aménagements extérieurs en bois sur mesure.",
    intro: [
      "Aménager votre extérieur en bois amène un aspect naturel et chaleureux. De plus, cela apporte de la plus-value à votre maison.",
      "Le bois se prête à toutes vos envies et nous savons le travailler : passerelles, douches extérieures, abris de jardin, garde-corps, luminaires, jardinières, etc. Nous mettrons tout en œuvre pour réaliser vos désirs.",
    ],
    hero: "/images/nos-services/5-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0",
    gallery: [
      { src: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Aménagement extérieur bois" },
      { src: "/images/nos-services/6-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Pergola bois" },
      { src: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Terrasse bois Mougins" },
    ],
  },
  "abris-de-voiture": {
    title: "Abris de voiture",
    h1: "Abris de voiture",
    description: "Carport bois sur mesure pour protéger votre voiture ou deux-roues. Structure en Douglas, conception design ou classique — Côte d'Azur.",
    intro: [
      "Pour prendre soin de votre véhicule, pourquoi ne pas opter pour un carport en bois ? Votre voiture ou votre deux-roues sera parfaitement à l'abri de toutes intempéries.",
      "Un abri de voiture design ou classique ? Le réaliser en bois apporte du cachet à votre maison. De plus, ce matériau écologique se fond avec l'environnement pour s'adapter à n'importe quel extérieur. Nous réalisons la structure en bois de Douglas, dont la résistance et la durabilité ne sont plus à prouver.",
    ],
    hero: "/images/nos-services/3-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Abri voiture bois" },
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Carport bois sur mesure" },
      { src: "/images/types_services_abris-voitures-pergolas/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Abri Douglas" },
    ],
  },
};

const PROCESSUS = [
  {
    num: "01",
    title: "Étude",
    desc: "Prise de cotes et examen du terrain, mesurage des hauteurs sous fenêtres, prise de photos du lieu, étude de portance, étude pour décaissement éventuel, et étude du terrain, plans.",
  },
  {
    num: "02",
    title: "Mise en place",
    desc: "De la gestion administrative au décaissement éventuel si besoin, la mise en place de la structure, pose des lames et ponçage intégral de la terrasse avec bandeau de finition si nécessaire.",
  },
  {
    num: "03",
    title: "Livraison",
    desc: "Le devis est dit « fourni posé ». Nous fournissons le bois choisi et nous procédons à l'installation. Déplacement du lundi au samedi de 8h à 19h, devis en 72h.",
  },
];

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];
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

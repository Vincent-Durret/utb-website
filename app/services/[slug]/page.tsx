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
      "Quel que soit votre projet, le bois est fait pour s'adapter à toutes les situations en vous assurant un confort et une longévité unique.",
      "À la fois chaleureuse et esthétique, la terrasse en bois apporte du charme et de l'authenticité à votre maison. Pour concevoir la terrasse de vos rêves, nous concevons ensemble votre projet afin de vous conseiller et vous apporter des solutions durables.",
      "Nous vous apportons les solutions quelle que soit la difficulté et les contraintes de votre terrain. Nous adaptons votre terrasse à la configuration de votre espace et respectons votre environnement. Notre plus : nous ponçons intégralement votre terrasse en fin de chantier, pour une finition parfaite.",
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
      "Notre région présente une topographie très accidentée. Pour optimiser au maximum l'espace, nous proposons l'aménagement de terrasses bois sur pilotis. Ce procédé est mis en œuvre par l'élévation de plots béton, de poteaux et d'une charpente porteuse.",
      "À plus d'un mètre du sol (voire 5 ou 6 mètres), la norme impose la mise en place de garde-corps. Pour ne pas occulter la vue, il est possible de mettre en place des panneaux de verre ou de plexiglas et d'allier le bois et l'inox pour une composition design.",
      "Une terrasse sur pilotis vous permet de profiter d'une place jusqu'alors inexploitée, d'avoir une vue plus dégagée sur votre environnement extérieur, et même de bénéficier d'un espace de rangement étanche sous la terrasse. La structure est réalisée en bois de Douglas.",
    ],
    hero: "/images/types_services_terrasses-bois-sur-pilotis/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois-sur-pilotis/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse sur pilotis" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Spécialiste pilotis" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Terrasse bois piscine" },
    ],
  },
  "terrasses-piscines-jardins": {
    title: "Terrasses piscines & jardins",
    h1: "Terrasses piscines & jardins",
    description: "Terrasses en bois autour de piscine et aménagement de jardins en bois. Spécialiste Côte d'Azur.",
    intro: [
      "Pour l'élaboration de votre terrasse de piscine, nous veillons à votre confort mais aussi à votre sécurité. Le bois exotique fait partie de nos matériaux pour la création de votre projet. En plus de donner du cachet à votre maison, il est naturellement imputrescible et dépourvu d'échardes.",
      "Entre jardin, terrasse et piscine, comment allier l'esthétisme à la fonctionnalité ? Nous concevons votre projet avec vous et vous présentons plusieurs maquettes créatives sur un même espace.",
      "Si votre piscine fonctionne au chlore, il peut y avoir quelques traces blanchâtres sur le bois qui disparaissent très rapidement. Nos essences exotiques (Cumaru, Ipé) sont spécialement adaptées aux environnements humides.",
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
    h1: "Pergolas & abris voitures",
    description: "Construction de pergolas et abris voitures en bois sur mesure. Alpes-Maritimes et Var — devis gratuit en 72h.",
    intro: [
      "Vous pouvez réaliser et concevoir des pergolas quel que soit l'espace et le lieu que vous souhaitez. Nous possédons les compétences adéquates et y apportons toute notre créativité.",
      "Concevoir et réaliser une pergola à ossature bois sur un espace réduit, arrimée de façon quasi invisible — là aussi, le professionnel est prépondérant. Des études en amont sont effectuées afin de tester la résistance au vent, au soulèvement et autres contraintes.",
      "Outre leur fonctionnalité, les pergolas amènent un univers cocooning à votre jardin, un coin d'ombre où déjeuner. Nous réalisons également des abris voitures en bois Douglas, résistants et esthétiques.",
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
      "Aménager votre extérieur en bois apporte un aspect naturel et chaleureux. De plus, cela ajoute de la valeur à votre maison.",
      "Le bois se prête à toutes vos envies et nous savons le travailler : passerelles, douches extérieures, abris de jardin, garde-corps, luminaires, jardinières, ponts japonais… Nous mettrons tout en œuvre pour réaliser vos désirs.",
      "Nous vous conseillons et vous accompagnons tout au long des travaux, de l'étude à la livraison. Chaque réalisation est conçue sur mesure pour s'intégrer harmonieusement à votre extérieur.",
    ],
    hero: "/images/nos-services/5-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0",
    gallery: [
      { src: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Aménagement extérieur bois" },
      { src: "/images/nos-services/6-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Pergola bois" },
      { src: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Terrasse bois Mougins" },
    ],
  },
  "toiture-en-teck": {
    title: "Toiture en teck",
    h1: "Toiture en teck",
    description: "Toiture et bardage en teck — bois noble, résistant et naturellement huilé pour vos extérieurs en Côte d'Azur.",
    intro: [
      "Le teck est un bois noble par excellence. Naturellement huilé, il offre une résistance remarquable aux intempéries et une longévité exceptionnelle pour vos toitures et bardages extérieurs.",
      "Pour prendre soin de votre véhicule ou couvrir votre terrasse, pourquoi ne pas opter pour une structure en teck ? Ce matériau écologique se fond avec l'environnement pour s'adapter à n'importe quel extérieur.",
      "Nous utilisons uniquement du teck issu de forêts gérées durablement. Nous réalisons la structure en bois de Douglas pour la charpente, dont la résistance et la durabilité ne sont plus à prouver.",
    ],
    hero: "/images/types_services_abris-voitures-pergolas/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Toiture teck" },
      { src: "/images/types_services_abris-voitures-pergolas/2-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0", alt: "Bardage bois" },
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Abri teck" },
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

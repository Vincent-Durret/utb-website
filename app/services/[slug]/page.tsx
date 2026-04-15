import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/home/CtaSection";

const SERVICES: Record<string, {
  title: string;
  h1: string;
  description: string;
  body: string;
  images: string[];
}> = {
  "terrasses-en-bois": {
    title: "Terrasses en bois",
    h1: "Terrasses en bois",
    description: "Construction de terrasses en bois sur mesure en Alpes-Maritimes et Var. Ipé, Cumaru, Teck — essences durables, visserie inox.",
    body: "La terrasse bois offre une esthétique chaleureuse, une durabilité exceptionnelle et une grande polyvalence d'aménagement. Les bois exotiques tels que le Cumaru, l'Itauba et l'Ipé sont souvent recommandés pour leur durabilité et leur résistance. Nous ponçons intégralement la terrasse en fin de chantier.",
    images: [],
  },
  "terrasses-sur-pilotis": {
    title: "Terrasses sur pilotis",
    h1: "Terrasses bois sur pilotis",
    description: "Spécialiste terrasses bois sur pilotis en Côte d'Azur. Terrain en pente, espace non accessible — nous adaptons votre terrasse.",
    body: "La terrasse en bois sur pilotis permet d'installer une terrasse sur un sol en pente en utilisant des techniques appropriées. Une terrasse sur pilotis est construite comme une charpente reposant sur des poteaux. Profitez d'un espace vert difficilement ou non accessible et agrandissez votre surface habitable.",
    images: [],
  },
  "terrasses-piscines-jardins": {
    title: "Terrasses piscines & jardins",
    h1: "Terrasses piscines & jardins",
    description: "Terrasses en bois autour de piscine et aménagement de jardins en bois. Spécialiste Côte d'Azur.",
    body: "Les terrasses en bois sont idéales pour épouser les contours de votre piscine et créer ainsi une plage pour la détente. Si votre piscine fonctionne au chlore, il peut y avoir quelques traces blanchâtres qui disparaissent très rapidement.",
    images: [],
  },
  "pergolas": {
    title: "Pergolas",
    h1: "Pergolas & abris voitures",
    description: "Construction de pergolas et abris voitures en bois sur mesure. Alpes-Maritimes et Var — devis gratuit en 72h.",
    body: "Nous réalisons des pergolas sur mesure en bois massif, des abris voitures, des jardinières, des ponts japonais et des abris de jardin. Chaque ouvrage est conçu pour s'intégrer harmonieusement à votre extérieur.",
    images: [],
  },
  "amenagements-exterieurs": {
    title: "Aménagements extérieurs",
    h1: "Aménagements extérieurs",
    description: "Garde-corps, luminaires, jardinières, clôtures — tous vos aménagements extérieurs en bois sur mesure.",
    body: "Outre la pose de terrasses bois, nous vous proposons l'installation de garde-corps, de luminaires, la réalisation de pergolas, d'abris de jardin, de jardinières, de ponts japonais, etc. Nous vous conseillons et vous accompagnons tout au long des travaux.",
    images: [],
  },
  "toiture-en-teck": {
    title: "Toiture en teck",
    h1: "Toiture en teck",
    description: "Toiture et bardage en teck — bois noble, résistant et naturellement huilé pour vos extérieurs en Côte d'Azur.",
    body: "Le teck est un bois noble par excellence. Naturellement huilé, il offre une résistance remarquable aux intempéries et une longévité exceptionnelle pour vos toitures et bardages extérieurs. Nous utilisons uniquement du teck issu de forêts gérées durablement.",
    images: [],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <>
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Nos services</div>
        <h1 className="text-noir-bois text-4xl md:text-5xl">{service.h1}</h1>
        <div className="dore-line mx-auto mt-4" />
      </div>

      <section className="bg-creme py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-muted text-base leading-relaxed">{service.body}</p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

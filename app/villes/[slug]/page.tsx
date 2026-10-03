import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/home/CtaSection";

const VILLES: Record<string, { name: string; dept: string }> = {
  "nice": { name: "Nice", dept: "06" },
  "antibes": { name: "Antibes", dept: "06" },
  "terrasses-bois-cannes": { name: "Cannes", dept: "06" },
  "terrasses-bois-grasse": { name: "Grasse", dept: "06" },
  "terrasses-bois-mandelieu": { name: "Mandelieu-la-Napoule", dept: "06" },
  "terrasses-bois-monaco": { name: "Monaco", dept: "98" },
  "terrasses-bois-mougins": { name: "Mougins", dept: "06" },
  "terrasses-bois-pegomas": { name: "Pégomas", dept: "06" },
  "terrasses-bois-vence": { name: "Vence", dept: "06" },
  "fayence": { name: "Fayence", dept: "83" },
  "frejus": { name: "Fréjus", dept: "83" },
  "la-gaude": { name: "La Gaude", dept: "06" },
};

export async function generateStaticParams() {
  return Object.keys(VILLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ville = VILLES[slug];
  if (!ville) return {};
  return {
    title: `Terrasse bois ${ville.name} (${ville.dept})`,
    description: `Construction de terrasses en bois sur pilotis et pergolas à ${ville.name} (${ville.dept}). Univers Terrasses Bois — devis gratuit en 72h.`,
  };
}

export default async function VillePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ville = VILLES[slug];
  if (!ville) notFound();

  return (
    <>
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Intervention locale</div>
        <h1 className="text-noir-bois">
          Terrasse bois {ville.name}
        </h1>
        <div className="dore-line mx-auto mt-4" />
      </div>

      <section className="bg-creme py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-muted mb-6">
            Univers Terrasses Bois intervient à <strong className="text-noir-bois">{ville.name}</strong> ({ville.dept})
            pour la construction de terrasses en bois, terrasses sur pilotis, pergolas et aménagements
            extérieurs. Devis gratuit remis en 72h.
          </p>
          <p className="text-muted mb-6">
            Notre équipe basée à Sophia Antipolis (06560) se déplace sur tout le secteur de {ville.name}
            et ses environs. Nous adaptons chaque projet à la configuration de votre terrain et à vos
            contraintes environnementales.
          </p>
          <p className="text-muted">
            Nos ouvrages sont garantis 10 ans (assurance décennale MMA). Nous utilisons des bois exotiques
            certifiés durables : Ipé, Cumaru, Teck issus de forêts gérées durablement.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

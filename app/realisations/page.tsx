import type { Metadata } from "next";
import { getRealisations, urlFor } from "@/lib/sanity.queries";
import CtaSection from "@/components/home/CtaSection";
import RealisationsGallery from "@/components/realisations/RealisationsGallery";

export const metadata: Metadata = {
  title: "Nos réalisations de terrasses, pergolas et abris de voiture",
  description: "Découvrez toutes nos réalisations de terrasses en bois et sur pilotis, de pergolas et d'abris de voiture dans les Alpes-Maritimes et le 83",
};

export const revalidate = 3600;

export default async function RealisationsPage() {
  const realisations = await getRealisations();

  const items = realisations.map((r) => ({
    _id: r._id,
    title: r.title,
    location: r.location,
    service: r.service,
    images: (r.images ?? []).map((img) => ({
      url: urlFor(img.asset).width(900).height(900).url(),
      urlFull: urlFor(img.asset).width(1400).height(1050).url(),
      alt: img.alt ?? r.title,
    })),
  }));

  return (
    <>
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Portfolio</div>
        <h1 className="text-noir-bois text-4xl md:text-5xl">Votre intérieur au grand air</h1>
        <div className="dore-line mx-auto mt-4" />
        <p className="text-muted text-sm mt-4 max-w-md mx-auto">
          Chaque projet est unique. Découvrez nos réalisations en Alpes-Maritimes et dans le Var.
        </p>
      </div>

      <RealisationsGallery items={items} />

      <CtaSection />
    </>
  );
}

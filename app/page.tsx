import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import UniversSection from "@/components/home/UniversSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import RealisationsStrip from "@/components/home/RealisationsStrip";
import type { RealisationPreview } from "@/components/home/RealisationsStrip";
import AvisSection from "@/components/home/AvisSection";
import FaqSection from "@/components/home/FaqSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";
import { getAvis, getRealisations, urlFor } from "@/lib/sanity.queries";

export const revalidate = 3600; // ISR — revalide toutes les heures

const GOOGLE_AVIS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? undefined;

export default async function HomePage() {
  const [raw, avis] = await Promise.all([getRealisations(), getAvis()]);

  const realisations: RealisationPreview[] = raw.slice(0, 5).map((r) => ({
    id: r._id,
    title: r.title,
    location: r.location ?? "",
    service: r.service ?? "",
    mainImageUrl: r.images?.[0]?.asset
      ? urlFor(r.images[0].asset).width(1200).height(675).fit("crop").url()
      : "",
    thumbImageUrl: r.images?.[0]?.asset
      ? urlFor(r.images[0].asset).width(400).height(225).fit("crop").url()
      : "",
  })).filter((r) => r.mainImageUrl !== "");

  return (
    <>
      <HeroSection />
      <StatsSection />
      <UniversSection />
      <ServicesSection />
      <ProcessSection />
      <RealisationsStrip realisations={realisations} />
      <AvisSection avis={avis} googleUrl={GOOGLE_AVIS_URL} />
      <FaqSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}

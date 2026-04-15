import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import UniversSection from "@/components/home/UniversSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import RealisationsStrip from "@/components/home/RealisationsStrip";
import type { RealisationPreview } from "@/components/home/RealisationsStrip";
import FaqSection from "@/components/home/FaqSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";
import { getRealisations, urlFor } from "@/lib/sanity.queries";

export const revalidate = 3600; // ISR — revalide toutes les heures

export default async function HomePage() {
  const raw = await getRealisations();

  const realisations: RealisationPreview[] = raw.slice(0, 5).map((r) => ({
    id: r._id,
    title: r.title,
    slug: r.slug?.current ?? "",
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
      <FaqSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}

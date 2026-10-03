import type { Metadata } from "next";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Réalisation et installation de terrasses en bois",
  description: "Société de réalisation de terrasses en bois, spécialiste de la terrasse en bois sur pilotis, devis sous 48h",
};

export default function AProposPage() {
  return (
    <>
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Notre histoire</div>
        <h1 className="text-noir-bois">Au cœur de votre nature</h1>
        <div className="dore-line mx-auto mt-4" />
      </div>

      {/* Expertise section */}
      <section className="bg-creme py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="label-upper text-brun text-[9px] mb-3">Une expertise de 12 ans</div>
            <h2 className="text-noir-bois mb-4">Notre Passion, Notre Métier</h2>
            <div className="dore-line mb-6" />
            <p className="text-muted mb-4">
              Notre équipe, composée de personnes qualifiées, pointilleuses et complémentaires met à votre
              disposition un savoir-faire acquis au fil des années et une expertise technique confirmée.
              Nous sommes créatifs et fiers de notre Métier, qui est notre Passion.
            </p>
            <p className="text-muted mb-4">Spécialiste de la conception, du calcul, de la réalisation et de l'expertise des structures bois extérieures complexes. </p>
            <p className="text-muted mb-4">
              Nous vous offrons pour un résultat durable et esthétique des matériaux de qualité : bois aux
              essences variées, labellisés et issus de forêts gérées durablement, visserie inox de fabrication
              allemande, outillage professionnel de qualité et efficace.
            </p>
            <p className="text-muted">
              Nos finitions sont minutieuses et soignées. Nous épousons les formes environnementales de la
              surface à habiller et{" "}
              <strong className="text-noir-bois">notre plus : nous ponçons intégralement la terrasse en fin de chantier.</strong>
            </p>
          </div>
          <div className="relative aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-br from-beige-card to-brun/20" />
            <Image
              src="/images/a-propos/logo-grave-1.jpg"
              alt="Expertise"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Avantages pilotis */}
      <section className="bg-beige py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-noir-bois">Les avantages de la terrasse sur pilotis</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "La durabilité dans le temps",
              "Peu d'entretien",
              "L'écoulement des eaux pluviales",
              "Le gain de place",
              "Pas de travaux coûteux",
              "L'esthétisme",
              "Le naturel et l'écologie",
              "La solidité",
              "La sécurité",
              "Le confort",
              "La rapidité d'exécution",
              "L'adaptation aux différences climatiques",
            ].map((avantage) => (
              <div key={avantage} className="flex items-start gap-2 py-2">
                <span className="text-dore mt-0.5 flex-shrink-0">✓</span>
                <span className="text-noir-bois text-xs">{avantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone + assurance */}
      <section className="bg-creme py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-noir-bois mb-4">Notre zone d&apos;intervention</h2>
          <div className="dore-line mx-auto mb-6" />
          <p className="text-muted mb-4">
            L&apos;entreprise basée sur Sophia Antipolis (06560) opère sur l&apos;ensemble des
            <strong className="text-noir-bois"> Alpes Maritimes (06)</strong> et du{" "}
            <strong className="text-noir-bois">Var (83)</strong>. Menton, Monaco, Nice, St Laurent du Var,
            Cagnes sur Mer, Antibes, Cannes, Mandelieu, Mougins, Fréjus, St Tropez, Sospel, Valberg,
            Vence, Grasse, St Cézaire…
          </p>
          <p className="text-muted mb-8">
            Nous nous déplaçons au-delà ponctuellement sur demande.
          </p>
          <div className="bg-beige border border-beige-card p-6 inline-block">
            <p className="text-muted text-xs leading-relaxed">
              Couverture en <strong className="text-noir-bois">Responsabilité Civile</strong> et{" "}
              <strong className="text-noir-bois">Responsabilité Civile Décennale</strong> auprès des
              Mutuelles du Mans (MMA). Garantie 10 ans sur tous nos ouvrages.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

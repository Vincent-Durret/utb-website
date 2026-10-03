import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Contactez nous pour vos projets",
  description: "Nous sommes à votre disposition pour construire vos terrasses en bois, vos pergolas et vos abris de voiture. Contactez-nous pour un devis.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Parlons de votre projet</div>
        <h1 className="text-noir-bois">Contact</h1>
        <div className="dore-line mx-auto mt-4" />
      </div>

      {/* Contact infos */}
      <section className="bg-creme py-16">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-noir-bois mb-6">Nos coordonnées</h2>
            <div className="space-y-4 text-muted">
              <div>
                <div className="label-upper text-dore text-[9px] mb-1">Adresse</div>
                <p>1503 Route des Dolines<br />06560 Valbonne – Sophia Antipolis</p>
              </div>
              <div>
                <div className="label-upper text-dore text-[9px] mb-1">Téléphone</div>
                <a href="tel:+33755625251" className="hover:text-brun transition-colors">07 55 62 52 51</a>
              </div>
              <div>
                <div className="label-upper text-dore text-[9px] mb-1">Email</div>
                <a href="mailto:contact@universterrassesbois.fr" className="hover:text-brun transition-colors">
                  contact@universterrassesbois.fr
                </a>
              </div>
              <div>
                <div className="label-upper text-dore text-[9px] mb-1">Horaires</div>
                <p>Lundi – Samedi · 8h00 – 19h00</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-noir-bois mb-6">Zone d&apos;intervention</h2>
            <p className="text-muted mb-4">
              Nous intervenons principalement dans les <strong className="text-noir-bois">Alpes-Maritimes (06)</strong> et
              le <strong className="text-noir-bois">Var (83)</strong> : Menton, Monaco, Nice, St Laurent du Var,
              Cagnes sur Mer, Antibes, Cannes, Mandelieu, Mougins, Fréjus, St Tropez, Sospel,
              Valberg, Vence, Grasse, St Cézaire…
            </p>
            <p className="text-muted">Nous nous déplaçons au-delà ponctuellement — consultez-nous.</p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

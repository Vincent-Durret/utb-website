import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales d'Univers Terrasses Bois.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-creme min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-noir-bois text-3xl mb-2">Mentions légales</h1>
        <div className="dore-line mb-10" />
        <div className="prose prose-sm prose-neutral max-w-none text-muted">
          <h2>Éditeur du site</h2>
          <p>
            <strong>Univers Terrasses Bois</strong><br />
            1503 Route des Dolines<br />
            06560 Valbonne – Sophia Antipolis<br />
            Téléphone : 07 55 62 52 51<br />
            Email : contact@universterrassesbois.fr
          </p>

          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 701, San Francisco, CA 94104, USA
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive
            d&apos;Univers Terrasses Bois. Toute reproduction, représentation, modification, publication,
            transmission, dénaturation de tout ou partie du site est interdite sans l&apos;accord écrit
            préalable d&apos;Univers Terrasses Bois.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires à son fonctionnement, ainsi qu&apos;un
            bandeau de consentement (tarteaucitron) pour gérer vos préférences. Vous pouvez à tout
            moment modifier vos choix via l&apos;icône cookies en bas à gauche de l&apos;écran, ou en
            suivant le lien{" "}
            <a href="#tarteaucitron" className="text-brun underline">
              #tarteaucitron
            </a>
            .
          </p>

          <h2>Politique de confidentialité</h2>
          <p>
            Les données personnelles collectées via le formulaire de contact sont utilisées uniquement
            pour répondre à vos demandes. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
            de rectification et de suppression de vos données.
          </p>
        </div>
      </div>
    </div>
  );
}

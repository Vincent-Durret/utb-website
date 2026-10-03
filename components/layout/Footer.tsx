import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-noir-footer text-creme">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo/logo-utb.png"
              alt="Univers Terrasses Bois"
              width={200}
              height={88}
              unoptimized
              className="h-14 w-auto mb-4"
            />
            <p className="text-white/50 text-sm leading-relaxed">
              Construction de terrasses et pergolas en bois raffiné pour particuliers, entreprises et collectivités.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="label-upper text-dore text-[9px] mb-4">Services</div>
            <ul className="space-y-2">
              {[
                { label: "Terrasses en bois", href: "/services/terrasses-en-bois" },
                { label: "Terrasses sur pilotis", href: "/services/terrasses-sur-pilotis" },
                { label: "Pergolas", href: "/services/pergolas" },
                { label: "Aménagements extérieurs", href: "/services/amenagements-exterieurs" },
                { label: "Terrasses piscines", href: "/services/terrasses-piscines-jardins" },
                { label: "Abris de voiture", href: "/services/abris-de-voiture" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-dore transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens */}
          <div>
            <div className="label-upper text-dore text-[9px] mb-4">Liens</div>
            <ul className="space-y-2">
              {[
                { label: "Réalisations", href: "/realisations" },
                { label: "Actualités", href: "/actualites-bois" },
                { label: "À propos", href: "/a-propos" },
                { label: "Contact", href: "/contact" },
                { label: "Mentions légales", href: "/mentions-legales" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-dore transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="label-upper text-dore text-[9px] mb-4">Contact</div>
            <address className="not-italic space-y-2 text-sm text-white/60">
              <p>1503 Route des Dolines<br />06560 Valbonne – Sophia Antipolis</p>
              <a href="tel:+33755625251" className="block hover:text-dore transition-colors">
                07 55 62 52 51
              </a>
              <a href="mailto:contact@universterrassesbois.fr" className="block hover:text-dore transition-colors">
                contact@universterrassesbois.fr
              </a>
              <p className="text-white/40 text-sm mt-2">Lun–Sam · 8h00–19h00</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-[11px]">
          <span>© {new Date().getFullYear()} Univers Terrasses Bois — Tous droits réservés</span>
          <span className="text-dore font-serif tracking-widest text-sm">UTB</span>
          <Link href="/mentions-legales" className="hover:text-white/60 transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}

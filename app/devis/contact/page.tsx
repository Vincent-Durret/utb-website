import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande de devis",
  description: "Demandez votre devis personnalisé pour la réalisation de votre terrasse en bois ou sur pilotis, votre pergolas ou votre abri de voiture.",
};

export default function DevisContactPage() {
  return (
    <>
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3" aria-hidden="true">Gratuit & sans engagement</div>
        <h1 className="text-noir-bois">Demandez votre devis</h1>
        <div className="dore-line mx-auto mt-4" aria-hidden="true" />
        <p className="text-muted mt-4">Étude personnalisée remise en 72h.</p>
      </div>

      <section className="bg-creme py-16" aria-labelledby="form-title">
        <div className="max-w-2xl mx-auto px-6">
          <h2 id="form-title" className="sr-only">Formulaire de demande de devis</h2>

          <form className="space-y-5" noValidate aria-label="Demande de devis gratuit">
            <p className="text-muted text-xs">
              Les champs marqués d&apos;un <span aria-label="astérisque, champ obligatoire">*</span> sont obligatoires.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="prenom" className="label-upper text-[9px] text-brun block mb-1.5">
                  Prénom <span aria-hidden="true">*</span>
                  <span className="sr-only">(obligatoire)</span>
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  autoComplete="given-name"
                  className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label htmlFor="nom" className="label-upper text-[9px] text-brun block mb-1.5">
                  Nom <span aria-hidden="true">*</span>
                  <span className="sr-only">(obligatoire)</span>
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors"
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telephone" className="label-upper text-[9px] text-brun block mb-1.5">
                Téléphone <span aria-hidden="true">*</span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                required
                autoComplete="tel"
                className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors"
                placeholder="06 XX XX XX XX"
              />
            </div>

            <div>
              <label htmlFor="email" className="label-upper text-[9px] text-brun block mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors"
                placeholder="jean@exemple.fr"
              />
            </div>

            <div>
              <label htmlFor="ville" className="label-upper text-[9px] text-brun block mb-1.5">
                Ville <span aria-hidden="true">*</span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <input
                id="ville"
                name="ville"
                type="text"
                required
                autoComplete="address-level2"
                className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors"
                placeholder="Nice, Cannes, Antibes…"
              />
            </div>

            <div>
              <label htmlFor="projet" className="label-upper text-[9px] text-brun block mb-1.5">
                Type de projet
              </label>
              <select
                id="projet"
                name="projet"
                className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors"
              >
                <option value="">Sélectionnez…</option>
                <option value="terrasse-bois">Terrasse en bois</option>
                <option value="sur-pilotis">Terrasse sur pilotis</option>
                <option value="pergola">Pergola / Abri voiture</option>
                <option value="piscine">Terrasse piscine</option>
                <option value="amenagement">Aménagement extérieur</option>
                <option value="teck">Toiture teck</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="label-upper text-[9px] text-brun block mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors resize-none"
                placeholder="Décrivez votre projet, la surface souhaitée, les contraintes de terrain…"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brun text-creme label-upper py-4 hover:bg-brun-dark transition-colors"
            >
              Envoyer ma demande de devis →
            </button>
          </form>

          <div className="mt-8 text-center text-muted text-xs">
            Ou appelez-nous directement :{" "}
            <a href="tel:+33755625251" className="text-brun hover:text-dore transition-colors font-medium">
              07 55 62 52 51
            </a>{" "}
            — Lun/Sam 8h–19h
          </div>
        </div>
      </section>
    </>
  );
}

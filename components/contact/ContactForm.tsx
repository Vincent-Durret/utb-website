import ProjectSelect from "@/components/contact/ProjectSelect";

const fieldClass =
  "w-full border border-beige-card bg-white px-4 py-3 text-noir-bois focus:outline-none focus:border-dore transition-colors";

export default function ContactForm() {
  return (
    <div>
      <div className="label-upper text-brun text-[9px] mb-3">Gratuit & sans engagement</div>
      <h2 id="form-title" className="text-noir-bois mb-2">Demandez votre devis</h2>
      <p className="text-muted mb-8">Étude personnalisée remise en 72h.</p>

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
              className={fieldClass}
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
              className={fieldClass}
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
            className={fieldClass}
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
            className={fieldClass}
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
            className={fieldClass}
            placeholder="Nice, Cannes, Antibes…"
          />
        </div>

        <div>
          <label htmlFor="projet" className="label-upper text-[9px] text-brun block mb-1.5">
            Type de projet
          </label>
          <ProjectSelect />
        </div>

        <div>
          <label htmlFor="message" className="label-upper text-[9px] text-brun block mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${fieldClass} resize-none`}
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
    </div>
  );
}

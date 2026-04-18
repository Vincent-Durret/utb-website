# Services Pages — Design Spec
Date: 2026-04-18

## Scope

10 pages au total :
- Refonte des 6 pages existantes `/services/[slug]`
- Nouvelle page `/nos-services` (overview)
- 3 nouvelles pages `/types_services/[slug]`

---

## Template A — Pages service individuelle

Utilisé pour les 6 `/services/[slug]` ET les 3 `/types_services/[slug]`.

### Structure

1. **Hero** (`bg-noir-bois`)
   - Image plein-cadre (`next/image`, `fill`, `object-cover`)
   - Overlay dégradé sombre par-dessus
   - Label `NOS SERVICES` (`.label-upper`, `text-dore`)
   - `<h1>` titre du service (blanc, text-4xl md:text-5xl)
   - Ligne dorée `.dore-line`

2. **Intro** (`bg-white`, `py-16`)
   - Texte complet issu du scraper (plusieurs paragraphes)
   - Max-width 3xl centré

3. **Processus** (`bg-beige`, `py-14`)
   - Titre de section : "Notre processus"
   - 3 étapes en grille (Étude / Mise en place / Livraison)
   - Chaque étape : numéro cerclé doré + titre + description courte

4. **Galerie** (`bg-creme`, `py-14`)
   - Titre : "Nos réalisations"
   - Grille 3 colonnes, images du dossier correspondant
   - `next/image` avec `width`/`height` fixes

5. **CtaSection** (composant existant)

---

## Page `/nos-services`

### Structure

1. **Header** (`bg-beige`, centré)
   - Label "CE QUE NOUS FAISONS"
   - `<h1>` Nos services
   - Description courte + `.dore-line`

2. **Grille 3×2** (`bg-creme`, `py-16`)
   - 6 cartes photo (`grid-cols-2 md:grid-cols-3`)
   - Chaque carte : image + overlay dégradé `to top` + titre + lien "Découvrir →"
   - Lien → `/services/[slug]`
   - Images : dossier `public/images/nos-services/`

3. **CtaSection**

---

## Mapping images

| Page | Dossier images |
|------|---------------|
| `/services/terrasses-en-bois` | `public/images/types_services_terrasses-bois/` |
| `/services/terrasses-sur-pilotis` | `public/images/types_services_terrasses-bois-sur-pilotis/` |
| `/services/terrasses-piscines-jardins` | `public/images/nos-services/` (photos 1–3) |
| `/services/pergolas` | `public/images/types_services_abris-voitures-pergolas/` |
| `/services/amenagements-exterieurs` | `public/images/nos-services/` (photos 4–6) |
| `/services/toiture-en-teck` | `public/images/types_services_abris-voitures-pergolas/` |
| `/types_services/terrasses-bois` | `public/images/types_services_terrasses-bois/` |
| `/types_services/terrasses-bois-sur-pilotis` | `public/images/types_services_terrasses-bois-sur-pilotis/` |
| `/types_services/abris-voitures-pergolas` | `public/images/types_services_abris-voitures-pergolas/` |
| `/nos-services` | `public/images/nos-services/` |

---

## Contenu textuel

Issu de `/Documents/utb-scrapping/services_*/content.txt` (paragraphes, H3).

Processus 3 étapes (commun à tous les services) :
- **Étude** : Prise de cotes, examen du terrain, plans
- **Mise en place** : Gestion administrative, structure, pose, ponçage
- **Livraison** : Devis personnalisé en 72h, déplacement lundi–samedi

---

## Routes Next.js à créer/modifier

- `app/services/[slug]/page.tsx` — modifier le template existant
- `app/nos-services/page.tsx` — créer
- `app/types_services/[slug]/page.tsx` — créer (route dynamique)

## Redirects existants

Aucun redirect à créer — les URLs `/types_services/*` sont des pages originales à préserver.

---

## Contraintes techniques

- `next/image` obligatoire pour toutes les images (`alt`, `priority` sur hero)
- ISR non nécessaire (contenu statique)
- Pas de composant Client Component nécessaire (pas d'animation GSAP sur ces pages)
- Respecter la palette : `creme`, `beige`, `dore`, `brun`, `noir-bois`
- Classes utilitaires existantes : `.label-upper`, `.dore-line`, `.text-muted`

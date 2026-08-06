# Univers Terrasses Bois — Suivi du projet

**Site :** universterrassesbois.fr  
**Stack :** Next.js 16 + TypeScript + Tailwind v4 + Sanity + GSAP + Vercel  
**Scraper :** `/Users/a20100/Documents/utb-scrapping/`

---

## Stack technique

| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| CMS | Sanity (hosted) — studio sur `/studio` |
| Animations | GSAP + ScrollTrigger + SplitText |
| Style | Tailwind CSS v4 |
| Typo | Playfair Display + Inter |
| Déploiement | Vercel |

---

## Palette

| Token | Valeur |
|---|---|
| `creme` | `#f5f0ea` |
| `beige` | `#ede8e0` |
| `dore` | `#c8a96e` |
| `brun` | `#7a6a4f` |
| `noir-bois` | `#2c2c2c` |
| `noir-footer` | `#1e1a14` |

---

## Tâches

### ✅ Setup
- [x] Initialiser Next.js 16 + TypeScript + Tailwind v4
- [x] Installer GSAP + @gsap/react + next-sanity
- [x] Configurer palette + fonts (Playfair Display + Inter)
- [x] Sanity initialisé — projet `k1houfoj`, dataset `production`
- [x] `.env.local` configuré avec `NEXT_PUBLIC_SANITY_PROJECT_ID` et `NEXT_PUBLIC_SANITY_DATASET`

### ✅ Design system
- [x] Variables CSS palette dans globals.css
- [x] Config Tailwind (couleurs custom via @theme)
- [x] Fonts next/font (Playfair Display + Inter)
- [x] Classes utilitaires `.label-upper`, `.dore-line`

### ✅ Accessibilité
- [x] `useReducedMotion` hook — GSAP désactivé si `prefers-reduced-motion`
- [x] Skip link `<a href="#main-content">`
- [x] Focus-visible ring doré (#c8a96e) sur tous les éléments interactifs
- [x] ARIA complet — Nav (menu/menubar/menuitem), FAQ (dl/dt/dd, aria-expanded), formulaire (labels, sr-only)
- [x] `next/image` avec `alt`, `priority` sur images above-the-fold

### ✅ Layout
- [x] Nav sticky avec GSAP hide/show au scroll + menu services dropdown
- [x] Footer avec 4 colonnes (brand, services, liens, contact)
- [x] Layout global app/layout.tsx
- [x] Bug dropdown "Nos services" — gap de 8px entre bouton et menu provoquait la fermeture prématurée. Fix : délai 150ms sur `onMouseLeave` via `clearTimeout`/`setTimeout`

### ✅ Homepage
- [x] HeroSection — GSAP SplitText + stagger fadeUp + image de fond
- [x] StatsSection — GSAP CountUp ScrollTrigger (12 / 500+ / 10 / 72h)
- [x] UniversSection — image parallax + texte slideInLeft
- [x] ServicesSection — liste numérotée éditoriale (01–06), accordion GSAP, stagger entrée depuis gauche
- [x] ProcessSection — ligne SVG DrawSVGPlugin + 3 étapes stagger
- [x] RealisationsStrip — design C : grande photo featured + vignettes cliquables, crossfade GSAP, données Sanity (ISR 1h) avec fallback statique
- [x] FaqSection — accordion GSAP (8 questions), dl/dt/dd
- [x] TrustSection — 4 éléments confiance fadeIn stagger, icônes SVG inline dorées (Shield, Leaf, FileText, Award)
- [x] CtaSection — scale+fade ScrollTrigger

### ✅ Pages statiques
- [x] `/a-propos` — expertise, avantages pilotis, zone intervention
- [x] `/contact` — coordonnées, zone intervention
- [x] `/devis/contact` — formulaire devis complet
- [x] `/mentions-legales`
- [x] `/contactez-nous` → redirect 301 → `/contact` (next.config.ts)

### ✅ Pages services (6) — template dynamique
- [x] `/nos-services` — page overview (grille des 6 cartes services)
- [x] `/services/terrasses-en-bois` — hero, intro, processus, galerie
- [x] `/services/terrasses-sur-pilotis` — hero, intro, processus, galerie
- [x] `/services/terrasses-piscines-jardins` — hero, intro, processus, galerie
- [x] `/services/pergolas` — hero, intro, processus, galerie
- [x] `/services/amenagements-exterieurs` — hero, intro, processus, galerie
- [x] `/services/abris-de-voiture` — hero, intro, processus, galerie (n'existe pas sur le site en ligne — page propre à la refonte)

### ✅ Pages types_services (3) — template dynamique
- [x] `/types_services/terrasses-bois`
- [x] `/types_services/terrasses-bois-sur-pilotis`
- [x] `/types_services/abris-voitures-pergolas`

### ✅ Pages SEO villes (12) — template dynamique
- [x] `/villes/nice`
- [x] `/villes/antibes`
- [x] `/villes/terrasses-bois-cannes`
- [x] `/villes/terrasses-bois-grasse`
- [x] `/villes/terrasses-bois-mandelieu`
- [x] `/villes/terrasses-bois-monaco`
- [x] `/villes/terrasses-bois-mougins`
- [x] `/villes/terrasses-bois-pegomas`
- [x] `/villes/terrasses-bois-vence`
- [x] `/villes/fayence`
- [x] `/villes/frejus`
- [x] `/villes/la-gaude`

### ✅ Sanity — Schémas & Studio
- [x] Schema `realisation` (title, slug, date, location, service, images, description)
- [x] Schema `actualite` (title, slug, publishedAt, excerpt, coverImage, body)
- [x] `sanity.config.ts` avec structure personnalisée
- [x] `lib/sanity.client.ts` + `lib/sanity.queries.ts`
- [x] Studio accessible sur `/studio`

### ✅ Pages dynamiques (Sanity)
- [x] `/realisations` — galerie plein-cadre : overlay dégradé au hover, texte sur image, badge service doré, lightbox plein écran au clic (navigation clavier/boutons, multi-images, fermeture Escape/backdrop)
- [x] `/realisations` — grille alternée : 1ère photo sur 3/4 de la largeur + 2 petites empilées sur le 1/4 restant, inversion gauche/droite à chaque ligne
- [x] `/realisations` — barre de filtres par type (Tout voir, Terrasses en bois, Terrasses sur pilotis, Aménagements en bois, Abris de voitures, Pergolas), filtrage client-side
- [x] `/realisations` — animation d'apparition au scroll (IntersectionObserver, fondu + translation + cascade par ligne)
- [x] `/realisations/[slug]` — page détail réalisation (Sanity)
- [x] `/actualites-bois` — liste articles
- [x] `/actualites-bois/[slug]` — article individuel (PortableText)

### ✅ Homepage — données Sanity
- [x] `app/page.tsx` — Server Component avec `await getRealisations()`, ISR `revalidate: 3600`
- [x] Images Sanity résolues côté serveur (`urlFor`) avant passage au Client Component

### ✅ Assets
- [x] Copier images scraper → `public/images/` (36 images)
- [x] `next.config.ts` — remotePatterns Sanity CDN + redirect contactez-nous
- [x] Favicon — `app/icon.png` (convention Next.js App Router, détection auto), ancien `favicon.ico` par défaut supprimé

### ✅ Sanity — Contenu
- [x] Schema `realisation` — champ `service` : "Pergola" et "Abri de voiture" séparés en deux valeurs distinctes
- [x] `npx sanity schema deploy` — schéma déployé en production
- [x] 88 réalisations importées dans Sanity (titre/ville/type déduits des noms de fichiers `public/images/realisations/`, upload images + création documents via script `@sanity/client`)

### ✅ SEO
- [x] Meta title/description scrapés sur le site en ligne (`universterrassesbois.fr`) et appliqués : accueil, à-propos, nos-services, réalisations, mentions légales, actualités (index), contact, devis, 5 pages `/services/[slug]`
- [x] Les 15 articles Sanity (`actualite`) — titre + extrait (= meta description) synchronisés avec le site en ligne ; corrigé au passage un extrait mal assigné (article "Woodsurfer Magazine" avait l'extrait de l'article "tour de piscine")
- [x] `app/robots.ts` — autorise Googlebot
- [x] Fix warning Next.js Image : `sizes` manquant sur l'image `fill` de `/a-propos`

---

## 🔲 À faire

### Avis Google (Places API)
- [ ] Créer projet Google Cloud Console + activer Places API
- [ ] Générer clé API + ajouter `GOOGLE_PLACES_API_KEY` dans `.env.local`
- [ ] Créer route/fetch server-side pour récupérer les 5 meilleurs avis (ISR `revalidate: 86400`)
- [ ] Créer composant `ReviewsSection` — affichage étoiles + texte + nom + date
- [ ] Intégrer sur homepage (entre TrustSection et CtaSection) ou page contact

### SEO & technique
- [ ] `app/sitemap.ts` — sitemap XML automatique (toutes les URLs)
- [ ] Soumettre le sitemap dans Google Search Console après mise en ligne
- [ ] Ajouter `@tailwindcss/typography` pour le rendu PortableText (articles) — classes `prose` déjà utilisées dans `/actualites-bois/[slug]` mais le plugin n'est pas installé
- [ ] Importer l'article de blog manquant "Mettre en valeur sa terrasse en bois" (existe sur le site en ligne, jamais importé dans Sanity)
- [ ] `robots: { index: false, follow: false }` dans `app/layout.tsx` — à repasser en indexable avant la mise en ligne définitive

### Formulaire devis
- [ ] Installer Resend (`npm install resend`) + créer route API `app/api/devis/route.ts`
- [ ] Configurer domaine expéditeur sur resend.com + ajouter `RESEND_API_KEY` dans `.env.local`
- [ ] Ajouter Google reCAPTCHA v3 sur le formulaire `/devis/contact` (anti-spam)
- [ ] Ajouter `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` dans `.env.local`
- [ ] Valider le token reCAPTCHA côté serveur dans la route API avant envoi

### Déploiement Vercel
- [x] `git init` + repo GitHub créé et poussé (`github.com/Vincent-Durret/utb-website`)
- [ ] Ajouter `.superpowers/` dans `.gitignore`
- [ ] Connecter à Vercel, ajouter variables d'env :
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=k1houfoj`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `SANITY_API_TOKEN` (token lecture pour ISR — non défini dans `.env.local` actuellement)
- [ ] Vérifier toutes les URLs en production (pas de 404)
- [ ] Lighthouse audit (perf ≥ 90, SEO 100, accessibilité 90+)

---

## Variables d'environnement

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=k1houfoj
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...   # à générer sur sanity.io/manage
```

---

## Commandes utiles

```bash
npm run dev               # Serveur de développement
npm run build             # Build de production
npx sanity schema deploy  # Déployer le schéma Sanity
npx sanity deploy         # Déployer le Studio Sanity
```

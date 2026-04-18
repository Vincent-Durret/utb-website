# Services Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre les 6 pages `/services/[slug]`, créer `/nos-services` (grille photo) et 3 pages `/types_services/[slug]` avec le même template enrichi (hero + intro + processus + galerie).

**Architecture:** Template Server Component statique partagé entre `/services/[slug]` et `/types_services/[slug]`. Page `/nos-services` indépendante. Aucun Client Component nécessaire (pas de GSAP sur ces pages). Tout le contenu est inline dans les data maps — pas de CMS, pas de fetch.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · `next/image`

---

## File Map

| Fichier | Action | Rôle |
|---------|--------|------|
| `app/services/[slug]/page.tsx` | Modifier | Template enrichi pour les 6 services |
| `app/nos-services/page.tsx` | Créer | Overview grille 3×2 cartes photo |
| `app/types_services/[slug]/page.tsx` | Créer | Même template que services, 3 slugs |

---

## Task 1 — Refonte `app/services/[slug]/page.tsx`

**Files:**
- Modify: `app/services/[slug]/page.tsx`

### Contexte images

Les images vivent dans `public/images/` et sont servies à `/images/...`. Elles sont en JPEG 394×259 px (thumbnails scraper). Certains fichiers n'ont pas d'extension — c'est normal, ce sont des JPEG, Next.js les sert sans problème.

### Contenu complet par service

```typescript
const SERVICES: Record<string, ServiceData> = {
  "terrasses-en-bois": {
    title: "Terrasses en bois",
    h1: "Terrasses en bois",
    description: "Construction de terrasses en bois sur mesure en Alpes-Maritimes et Var. Ipé, Cumaru, Teck — essences durables, visserie inox.",
    intro: [
      "Quel que soit votre projet, le bois est fait pour s'adapter à toutes les situations en vous assurant un confort et une longévité unique.",
      "À la fois chaleureuse et esthétique, la terrasse en bois apporte du charme et de l'authenticité à votre maison. Pour concevoir la terrasse de vos rêves, nous concevons ensemble votre projet afin de vous conseiller et vous apporter des solutions durables.",
      "Nous vous apportons les solutions quelle que soit la difficulté et les contraintes de votre terrain. Nous adaptons votre terrasse à la configuration de votre espace et respectons votre environnement. Notre plus : nous ponçons intégralement votre terrasse en fin de chantier, pour une finition parfaite.",
    ],
    hero: "/images/types_services_terrasses-bois/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse bois Côte d'Azur" },
      { src: "/images/types_services_terrasses-bois/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Terrasse bois sur pilotis" },
      { src: "/images/types_services_terrasses-bois/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Contour piscine bois" },
    ],
  },
  "terrasses-sur-pilotis": {
    title: "Terrasses sur pilotis",
    h1: "Terrasses bois sur pilotis",
    description: "Spécialiste terrasses bois sur pilotis en Côte d'Azur. Terrain en pente, espace non accessible — nous adaptons votre terrasse.",
    intro: [
      "Notre région présente une topographie très accidentée. Pour optimiser au maximum l'espace, nous proposons l'aménagement de terrasses bois sur pilotis. Ce procédé est mis en œuvre par l'élévation de plots béton, de poteaux et d'une charpente porteuse.",
      "À plus d'un mètre du sol (voire 5 ou 6 mètres), la norme impose la mise en place de garde-corps. Pour ne pas occulter la vue, il est possible de mettre en place des panneaux de verre ou de plexiglas et d'allier le bois et l'inox pour une composition design.",
      "Une terrasse sur pilotis vous permet de profiter d'une place jusqu'alors inexploitée, d'avoir une vue plus dégagée sur votre environnement extérieur, et même de bénéficier d'un espace de rangement étanche sous la terrasse. La structure est réalisée en bois de Douglas.",
    ],
    hero: "/images/types_services_terrasses-bois-sur-pilotis/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois-sur-pilotis/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse sur pilotis" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Spécialiste pilotis" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Terrasse bois piscine" },
    ],
  },
  "terrasses-piscines-jardins": {
    title: "Terrasses piscines & jardins",
    h1: "Terrasses piscines & jardins",
    description: "Terrasses en bois autour de piscine et aménagement de jardins en bois. Spécialiste Côte d'Azur.",
    intro: [
      "Pour l'élaboration de votre terrasse de piscine, nous veillons à votre confort mais aussi à votre sécurité. Le bois exotique fait partie de nos matériaux pour la création de votre projet. En plus de donner du cachet à votre maison, il est naturellement imputrescible et dépourvu d'échardes.",
      "Entre jardin, terrasse et piscine, comment allier l'esthétisme à la fonctionnalité ? Nous concevons votre projet avec vous et vous présentons plusieurs maquettes créatives sur un même espace.",
      "Si votre piscine fonctionne au chlore, il peut y avoir quelques traces blanchâtres sur le bois qui disparaissent très rapidement. Nos essences exotiques (Cumaru, Ipé) sont spécialement adaptées aux environnements humides.",
    ],
    hero: "/images/nos-services/1-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Contour piscine bois" },
      { src: "/images/nos-services/3-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Aménagement bois jardin" },
      { src: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Terrasse jardin bois" },
    ],
  },
  "pergolas": {
    title: "Pergolas",
    h1: "Pergolas & abris voitures",
    description: "Construction de pergolas et abris voitures en bois sur mesure. Alpes-Maritimes et Var — devis gratuit en 72h.",
    intro: [
      "Vous pouvez réaliser et concevoir des pergolas quel que soit l'espace et le lieu que vous souhaitez. Nous possédons les compétences adéquates et y apportons toute notre créativité.",
      "Concevoir et réaliser une pergola à ossature bois sur un espace réduit, arrimée de façon quasi invisible — là aussi, le professionnel est prépondérant. Des études en amont sont effectuées afin de tester la résistance au vent, au soulèvement et autres contraintes.",
      "Outre leur fonctionnalité, les pergolas amènent un univers cocooning à votre jardin, un coin d'ombre où déjeuner. Nous réalisons également des abris voitures en bois Douglas, résistants et esthétiques.",
    ],
    hero: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Abri voiture bois" },
      { src: "/images/types_services_abris-voitures-pergolas/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Pergola bois sur mesure" },
      { src: "/images/types_services_abris-voitures-pergolas/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Aménagement bois extérieur" },
    ],
  },
  "amenagements-exterieurs": {
    title: "Aménagements extérieurs",
    h1: "Aménagements extérieurs",
    description: "Garde-corps, luminaires, jardinières, clôtures — tous vos aménagements extérieurs en bois sur mesure.",
    intro: [
      "Aménager votre extérieur en bois apporte un aspect naturel et chaleureux. De plus, cela ajoute de la valeur à votre maison.",
      "Le bois se prête à toutes vos envies et nous savons le travailler : passerelles, douches extérieures, abris de jardin, garde-corps, luminaires, jardinières, ponts japonais… Nous mettrons tout en œuvre pour réaliser vos désirs.",
      "Nous vous conseillons et vous accompagnons tout au long des travaux, de l'étude à la livraison. Chaque réalisation est conçue sur mesure pour s'intégrer harmonieusement à votre extérieur.",
    ],
    hero: "/images/nos-services/5-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0",
    gallery: [
      { src: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Aménagement extérieur bois" },
      { src: "/images/nos-services/6-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Pergola bois" },
      { src: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Terrasse bois Mougins" },
    ],
  },
  "toiture-en-teck": {
    title: "Toiture en teck",
    h1: "Toiture en teck",
    description: "Toiture et bardage en teck — bois noble, résistant et naturellement huilé pour vos extérieurs en Côte d'Azur.",
    intro: [
      "Le teck est un bois noble par excellence. Naturellement huilé, il offre une résistance remarquable aux intempéries et une longévité exceptionnelle pour vos toitures et bardages extérieurs.",
      "Pour prendre soin de votre véhicule ou couvrir votre terrasse, pourquoi ne pas opter pour une structure en teck ? Ce matériau écologique se fond avec l'environnement pour s'adapter à n'importe quel extérieur.",
      "Nous utilisons uniquement du teck issu de forêts gérées durablement. Nous réalisons la structure en bois de Douglas pour la charpente, dont la résistance et la durabilité ne sont plus à prouver.",
    ],
    hero: "/images/types_services_abris-voitures-pergolas/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Toiture teck" },
      { src: "/images/types_services_abris-voitures-pergolas/2-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0", alt: "Bardage bois" },
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Abri teck" },
    ],
  },
};
```

### Steps

- [ ] **Step 1 : Remplacer le contenu de `app/services/[slug]/page.tsx`**

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";

type ServiceData = {
  title: string;
  h1: string;
  description: string;
  intro: string[];
  hero: string;
  gallery: { src: string; alt: string }[];
};

const SERVICES: Record<string, ServiceData> = {
  // … coller le contenu complet de la data map ci-dessus
};

const PROCESSUS = [
  {
    num: "01",
    title: "Étude",
    desc: "Prise de cotes, examen du terrain, mesure des hauteurs, étude de portance et plans.",
  },
  {
    num: "02",
    title: "Mise en place",
    desc: "Gestion administrative, structure, pose des lames et ponçage intégral de la terrasse.",
  },
  {
    num: "03",
    title: "Livraison",
    desc: "Devis personnalisé en 72h. Déplacement du lundi au samedi de 8h à 19h.",
  },
];

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <div className="relative h-80 md:h-[420px] bg-noir-bois">
        <Image
          src={service.hero}
          alt={service.h1}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="label-upper text-dore text-[9px] mb-3">Nos services</div>
          <h1 className="text-creme text-4xl md:text-5xl">{service.h1}</h1>
          <div className="dore-line mx-auto mt-4" />
        </div>
      </div>

      {/* Intro */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {service.intro.map((p, i) => (
            <p key={i} className="text-muted text-sm leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Processus */}
      <section className="bg-beige py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="label-upper text-brun text-[9px] mb-3">Comment ça se passe</div>
            <h2 className="text-noir-bois text-3xl">Notre processus</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESSUS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-dore text-creme flex items-center justify-center mx-auto mb-4 label-upper text-[11px]">
                  {step.num}
                </div>
                <h3 className="text-noir-bois text-lg mb-2">{step.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-creme py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="label-upper text-brun text-[9px] mb-3">Photos</div>
            <h2 className="text-noir-bois text-3xl">Nos réalisations</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.gallery.map((img) => (
              <div key={img.src} className="relative aspect-[3/2] bg-beige overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
```

- [ ] **Step 2 : Vérifier que la build passe**

```bash
cd /Users/a20100/CODE/utb-website && npm run build
```

Expected : `✓ Compiled successfully` — 6 routes `/services/[slug]` générées.

- [ ] **Step 3 : Vérifier visuellement une page**

```bash
npm run dev
```

Ouvrir `http://localhost:3000/services/terrasses-en-bois` et vérifier :
- Hero image visible avec overlay sombre
- 3 paragraphes d'intro
- Section processus 3 étapes
- Galerie 3 photos
- CtaSection en bas

- [ ] **Step 4 : Commit**

```bash
git add app/services/[slug]/page.tsx
git commit -m "refonte: template enrichi pages services (hero + processus + galerie)"
```

---

## Task 2 — Créer `app/nos-services/page.tsx`

**Files:**
- Create: `app/nos-services/page.tsx`

### Données des cartes

```typescript
const SERVICE_CARDS = [
  {
    title: "Terrasses en bois",
    href: "/services/terrasses-en-bois",
    img: "/images/nos-services/1-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
  },
  {
    title: "Terrasses sur pilotis",
    href: "/services/terrasses-sur-pilotis",
    img: "/images/nos-services/2-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh",
  },
  {
    title: "Piscines & jardins",
    href: "/services/terrasses-piscines-jardins",
    img: "/images/nos-services/3-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t",
  },
  {
    title: "Pergolas & abris",
    href: "/services/pergolas",
    img: "/images/nos-services/4-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4",
  },
  {
    title: "Aménagements extérieurs",
    href: "/services/amenagements-exterieurs",
    img: "/images/nos-services/5-realisation-cache-pot-bois-sur-mesure-entrprise-valbonne-Nice-Mougin-q81o6bww0",
  },
  {
    title: "Toiture en teck",
    href: "/services/toiture-en-teck",
    img: "/images/nos-services/6-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx",
  },
];
```

### Steps

- [ ] **Step 1 : Créer `app/nos-services/page.tsx`**

```typescript
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Terrasses en bois, terrasses sur pilotis, piscines & jardins, pergolas, aménagements extérieurs — Univers Terrasses Bois, spécialiste Côte d'Azur.",
};

const SERVICE_CARDS = [
  // … coller le tableau complet ci-dessus
];

export default function NosServicesPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Ce que nous faisons</div>
        <h1 className="text-noir-bois text-4xl md:text-5xl">Nos services</h1>
        <div className="dore-line mx-auto mt-4 mb-6" />
        <p className="text-muted text-sm max-w-xl mx-auto px-6">
          Terrasses, pergolas, aménagements extérieurs — chaque projet sur mesure en Côte d&apos;Azur.
        </p>
      </div>

      {/* Grille */}
      <section className="bg-creme py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICE_CARDS.map((card) => (
              <Link key={card.href} href={card.href} className="group block relative aspect-[4/3] bg-beige overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-creme text-lg">{card.title}</h2>
                  <span className="label-upper text-dore text-[9px]">Découvrir →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
```

- [ ] **Step 2 : Vérifier la build**

```bash
npm run build
```

Expected : route `/nos-services` générée sans erreur.

- [ ] **Step 3 : Vérifier visuellement**

Ouvrir `http://localhost:3000/nos-services` et vérifier :
- Header centré avec label, h1, ligne dorée, sous-titre
- Grille 3×2 de cartes photo avec overlay dégradé
- Titres lisibles en bas de chaque carte
- Hover → zoom image + "Découvrir →" visible

- [ ] **Step 4 : Commit**

```bash
git add app/nos-services/page.tsx
git commit -m "feat: page /nos-services — grille 3x2 cartes services"
```

---

## Task 3 — Créer `app/types_services/[slug]/page.tsx`

**Files:**
- Create: `app/types_services/[slug]/page.tsx`

### Contenu des 3 types_services

```typescript
type TypeServiceData = {
  title: string;
  h1: string;
  description: string;
  intro: string[];
  hero: string;
  gallery: { src: string; alt: string }[];
};

const TYPES_SERVICES: Record<string, TypeServiceData> = {
  "terrasses-bois": {
    title: "Terrasses en bois — Types et essences",
    h1: "Terrasses en bois",
    description: "Ipé, Cumaru, Itauba — découvrez nos essences de bois pour terrasses sur mesure en Côte d'Azur.",
    intro: [
      "Quel que soit votre projet, le bois est fait pour s'adapter à toutes les situations en vous assurant un confort et une longévité unique.",
      "Les bois exotiques tels que le Cumaru, l'Itauba et l'Ipé sont souvent recommandés pour leur durabilité et leur résistance. Naturellement imputrescibles et sans échardes, ils sont idéaux pour les terrasses extérieures exposées aux intempéries.",
      "Nous ponçons intégralement la terrasse en fin de chantier, pour une finition parfaite. Le devis est dit « fourni posé » : nous fournissons le bois choisi et procédons à l'installation.",
    ],
    hero: "/images/types_services_terrasses-bois/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse bois exotique" },
      { src: "/images/types_services_terrasses-bois/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Terrasse bois Fréjus Grasse" },
      { src: "/images/types_services_terrasses-bois/6-constructeur-contour-piscine-terrasse-bois-mougin-nice-valbonne-q81n7ktpbkh0gh", alt: "Contour piscine bois Mougins" },
    ],
  },
  "terrasses-bois-sur-pilotis": {
    title: "Terrasses bois sur pilotis — Terrain en pente",
    h1: "Terrasses bois sur pilotis",
    description: "Terrain en pente, espace non accessible — la terrasse sur pilotis est la solution. Devis gratuit en 72h.",
    intro: [
      "Profitez d'un espace vert difficilement ou non accessible avec la terrasse bois sur pilotis. Agrandissez votre surface habitable grâce à ce procédé mis en œuvre par l'élévation de plots béton, de poteaux et d'une charpente porteuse.",
      "Notre bureau d'études calcule le dimensionnement de la structure pour recevoir une charge admissible. À plus d'un mètre du sol, la norme impose la mise en place de garde-corps — verre, plexiglas ou inox selon votre goût.",
      "Vous pouvez aussi profiter d'un espace de rangement étanche et éclairé sous la terrasse. La structure est réalisée en bois de Douglas, dont la résistance est reconnue.",
    ],
    hero: "/images/types_services_terrasses-bois-sur-pilotis/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg",
    gallery: [
      { src: "/images/types_services_terrasses-bois-sur-pilotis/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx", alt: "Terrasse pilotis terrain pente" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Spécialiste pilotis Fréjus" },
      { src: "/images/types_services_terrasses-bois-sur-pilotis/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Terrasse pilotis Nice Antibes" },
    ],
  },
  "abris-voitures-pergolas": {
    title: "Abris voitures & pergolas bois",
    h1: "Abris voitures & pergolas",
    description: "Abris voitures et pergolas en bois sur mesure — bois Douglas, design ou classique. Alpes-Maritimes et Var.",
    intro: [
      "Pour prendre soin de votre véhicule, pourquoi ne pas opter pour un carport en bois ? Votre voiture ou votre deux-roues sera parfaitement à l'abri de toutes intempéries. Réaliser un abri de voiture en bois apporte du cachet à votre maison.",
      "Nous réalisons la structure en bois de Douglas, dont la résistance et la durabilité ne sont plus à prouver. Des études en amont sont effectuées afin de tester la résistance au vent et au soulèvement.",
      "Outre leur fonctionnalité, les pergolas amènent un univers cocooning à votre jardin, un coin d'ombre idéal. Vous pouvez réaliser et concevoir des pergolas quel que soit l'espace et le lieu souhaité.",
    ],
    hero: "/images/types_services_abris-voitures-pergolas/1-constructeur-entreprise-pergolas-bois-alpes-maritimes-var-q81o7bmr7rejyndvkwjx",
    gallery: [
      { src: "/images/types_services_abris-voitures-pergolas/5-abri_voiture_bois-Nice-AntibeCannes-1-q81o6wlc6etysvzq0q1wvzrygg1exmf14s4n9t7t", alt: "Abri voiture bois Nice Antibes" },
      { src: "/images/types_services_abris-voitures-pergolas/3-entreprise-specialiste-terrasse-bois-sur-pilotis-frejus-grasse-mandelieu-q81o4", alt: "Pergola bois Alpes Maritimes" },
      { src: "/images/types_services_abris-voitures-pergolas/7-terrasse_bois_cote_dazur-q81nzb2axmfiyd11dxth8estlbhlpp9536acmahdi6.jpg", alt: "Abri pergola bois" },
    ],
  },
};
```

### Steps

- [ ] **Step 1 : Créer `app/types_services/[slug]/page.tsx`**

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";

type TypeServiceData = {
  title: string;
  h1: string;
  description: string;
  intro: string[];
  hero: string;
  gallery: { src: string; alt: string }[];
};

const TYPES_SERVICES: Record<string, TypeServiceData> = {
  // … coller le contenu complet de la data map ci-dessus
};

const PROCESSUS = [
  {
    num: "01",
    title: "Étude",
    desc: "Prise de cotes, examen du terrain, mesure des hauteurs, étude de portance et plans.",
  },
  {
    num: "02",
    title: "Mise en place",
    desc: "Gestion administrative, structure, pose des lames et ponçage intégral de la terrasse.",
  },
  {
    num: "03",
    title: "Livraison",
    desc: "Devis personnalisé en 72h. Déplacement du lundi au samedi de 8h à 19h.",
  },
];

export async function generateStaticParams() {
  return Object.keys(TYPES_SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = TYPES_SERVICES[slug];
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function TypeServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = TYPES_SERVICES[slug];
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <div className="relative h-80 md:h-[420px] bg-noir-bois">
        <Image
          src={service.hero}
          alt={service.h1}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="label-upper text-dore text-[9px] mb-3">Nos services</div>
          <h1 className="text-creme text-4xl md:text-5xl">{service.h1}</h1>
          <div className="dore-line mx-auto mt-4" />
        </div>
      </div>

      {/* Intro */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {service.intro.map((p, i) => (
            <p key={i} className="text-muted text-sm leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Processus */}
      <section className="bg-beige py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="label-upper text-brun text-[9px] mb-3">Comment ça se passe</div>
            <h2 className="text-noir-bois text-3xl">Notre processus</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESSUS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-dore text-creme flex items-center justify-center mx-auto mb-4 label-upper text-[11px]">
                  {step.num}
                </div>
                <h3 className="text-noir-bois text-lg mb-2">{step.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-creme py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="label-upper text-brun text-[9px] mb-3">Photos</div>
            <h2 className="text-noir-bois text-3xl">Nos réalisations</h2>
            <div className="dore-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.gallery.map((img) => (
              <div key={img.src} className="relative aspect-[3/2] bg-beige overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
```

- [ ] **Step 2 : Vérifier la build**

```bash
npm run build
```

Expected : 3 routes `/types_services/[slug]` générées (`terrasses-bois`, `terrasses-bois-sur-pilotis`, `abris-voitures-pergolas`).

- [ ] **Step 3 : Vérifier visuellement**

Ouvrir les 3 URLs et vérifier le même template que les services :
- `http://localhost:3000/types_services/terrasses-bois`
- `http://localhost:3000/types_services/terrasses-bois-sur-pilotis`
- `http://localhost:3000/types_services/abris-voitures-pergolas`

- [ ] **Step 4 : Commit**

```bash
git add app/types_services/
git commit -m "feat: pages /types_services/[slug] — terrasses-bois, pilotis, abris-pergolas"
```

---

## Vérification finale

- [ ] **Build complète**

```bash
npm run build
```

Expected : aucune erreur TypeScript ni d'images introuvables. Les routes générées incluent :
- `/services/terrasses-en-bois`, `/services/terrasses-sur-pilotis`, `/services/terrasses-piscines-jardins`, `/services/pergolas`, `/services/amenagements-exterieurs`, `/services/toiture-en-teck`
- `/nos-services`
- `/types_services/terrasses-bois`, `/types_services/terrasses-bois-sur-pilotis`, `/types_services/abris-voitures-pergolas`

- [ ] **Commit final**

```bash
git add -A
git commit -m "chore: vérification finale — 10 pages services complètes"
```

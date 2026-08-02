import { sanityClient, isSanityConfigured } from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// Image URL builder
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types
export type Realisation = {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  service?: string;
  images: Array<{ asset: SanityImageSource; alt?: string }>;
  description?: string;
};

export type Actualite = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage?: { asset: SanityImageSource; alt?: string };
  body?: unknown[];
};

export type Avis = {
  _id: string;
  authorName: string;
  rating: number;
  comment: string;
  date?: string;
  order?: number;
};

// Queries — return empty results if Sanity is not yet configured
export async function getRealisations(service?: string): Promise<Realisation[]> {
  if (!isSanityConfigured) return [];
  const filter = service ? `&& service == "${service}"` : "";
  return sanityClient.fetch(
    `*[_type == "realisation" ${filter}] | order(date desc) {
      _id, title, date, location, service,
      "images": images[]{asset, alt},
      description
    }`
  );
}

export async function getRealisation(slug: string): Promise<Realisation | null> {
  if (!isSanityConfigured) return null;
  return sanityClient.fetch(
    `*[_type == "realisation" && slug.current == $slug][0] {
      _id, title, date, location, service,
      "images": images[]{asset, alt},
      description
    }`,
    { slug }
  );
}

export async function getActualites(): Promise<Actualite[]> {
  if (!isSanityConfigured) return [];
  return sanityClient.fetch(
    `*[_type == "actualite"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt,
      "coverImage": coverImage{asset, alt}
    }`
  );
}

export async function getActualite(slug: string): Promise<Actualite | null> {
  if (!isSanityConfigured) return null;
  return sanityClient.fetch(
    `*[_type == "actualite" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt,
      "coverImage": coverImage{asset, alt},
      body[]{
        ...,
        _type == "image" => { ..., asset-> }
      }
    }`,
    { slug }
  );
}

export async function getAvis(): Promise<Avis[]> {
  if (!isSanityConfigured) return [];
  return sanityClient.fetch(
    `*[_type == "avis"] | order(order asc, date desc) {
      _id, authorName, rating, comment, date, order
    }`
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getActualites, urlFor } from "@/lib/sanity.queries";

export const metadata: Metadata = {
  title: "Nos actualités",
  description: "Découvrez les actualités et dernières constructions de terrasses en bois et pergolas d'Univers Terrasses Bois",
};

export const revalidate = 3600;

export default async function ActualitesPage() {
  const actualites = await getActualites();

  return (
    <>
      <div className="bg-beige pt-28 pb-14 text-center">
        <div className="label-upper text-brun text-[9px] mb-3">Blog</div>
        <h1 className="text-noir-bois">Actualités bois</h1>
        <div className="dore-line mx-auto mt-4" />
      </div>

      <section className="bg-creme py-16">
        <div className="max-w-6xl mx-auto px-6">
          {actualites.length === 0 ? (
            <div className="text-center py-20 text-muted">
              <p>Aucune actualité pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {actualites.map((a) => (
                <Link key={a._id} href={`/actualites-bois/${a.slug.current}`} className="group">
                  <article className="bg-white border border-beige-card overflow-hidden hover:border-dore transition-colors">
                    {a.coverImage && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={urlFor(a.coverImage.asset).width(720).height(405).url()}
                          alt={a.coverImage.alt ?? a.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="label-upper text-dore text-[9px] mb-2">
                        {new Date(a.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </div>
                      <h2 className="text-noir-bois font-serif text-titre-secondaire mb-2 group-hover:text-brun transition-colors">
                        {a.title}
                      </h2>
                      <p className="text-muted line-clamp-3">{a.excerpt}</p>
                      <div className="mt-4 text-brun label-upper text-[9px]">Lire la suite →</div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

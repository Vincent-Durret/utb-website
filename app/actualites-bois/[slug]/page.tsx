import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActualite, getActualites, urlFor } from "@/lib/sanity.queries";
import { PortableText } from "next-sanity";

export const revalidate = 3600;

export async function generateStaticParams() {
  const actualites = await getActualites();
  return actualites.map((a) => ({ slug: a.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getActualite(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ActualitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getActualite(slug);
  if (!article) notFound();

  return (
    <>
      <div className="bg-beige pt-28 pb-10 text-center">
        <Link href="/actualites-bois" className="label-upper text-brun text-[9px] hover:text-dore transition-colors mb-4 inline-block">
          ← Toutes les actualités
        </Link>
        <div className="label-upper text-dore text-[9px] mb-3">
          {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric",
          })}
        </div>
        <h1 className="text-noir-bois max-w-2xl mx-auto px-6">{article.title}</h1>
        <div className="dore-line mx-auto mt-4" />
      </div>

      {article.coverImage && (
        <div className="relative h-72 md:h-[480px] overflow-hidden">
          <Image
            src={urlFor(article.coverImage.asset).width(1200).height(480).url()}
            alt={article.coverImage.alt ?? article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <article className="bg-creme py-14">
        <div className="max-w-6xl mx-auto px-6 prose prose-neutral prose-headings:font-serif prose-headings:text-noir-bois prose-p:text-muted prose-p:text-texte">
          {article.body && (
            <PortableText
              value={article.body as Parameters<typeof PortableText>[0]["value"]}
              components={{
                types: {
                  image: ({ value }) => {
                    if (!value?.asset) return null;
                    return (
                      <div className="relative w-full aspect-[16/9] my-8 overflow-hidden rounded-sm not-prose">
                        <Image
                          src={urlFor(value.asset).width(900).height(506).url()}
                          alt={value.alt ?? ""}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 672px"
                        />
                      </div>
                    );
                  },
                },
              }}
            />
          )}
        </div>
      </article>
    </>
  );
}

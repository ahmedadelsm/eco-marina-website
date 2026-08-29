import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ButtonArrow } from "@/components/Button";
import { getInsight, insights } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return { title: "Insight" };
  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${slug}`,
    image: article.image,
    type: "article",
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <section className="relative min-h-[360px] overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image src={article.image} alt="" fill className="photo-image object-cover opacity-50" priority sizes="100vw" />
          <div className="page-hero-overlay absolute inset-0" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea-light">
            {article.category} · {article.date} · {article.readTime}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg text-white/80">{article.excerpt}</p>
        </div>
      </section>

      <article className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {article.sections.map((section) => (
            <section key={section.heading} className="mb-12 last:mb-0">
              <h2 className="font-serif text-2xl font-semibold text-ink">{section.heading}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{section.body}</p>
            </section>
          ))}

          <div className="mt-16 border-t border-line pt-10">
            <p className="text-sm text-ink-muted">
              Written by{" "}
              <Link href="/about" className="font-medium text-sea hover:underline">
                Adel Regal
              </Link>
              , founder of Eco Marina.
            </p>
            <ButtonArrow href="/contact" className="mt-6">
              Discuss your project
            </ButtonArrow>
          </div>
        </div>
      </article>
    </>
  );
}

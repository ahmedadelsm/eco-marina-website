import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ButtonArrow } from "@/components/Button";
import { DetailHero } from "@/components/DetailHero";
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
      <DetailHero
        image={article.image}
        imageAlt={article.title}
        eyebrow={`${article.category} · ${article.date} · ${article.readTime}`}
        title={article.title}
        description={article.excerpt}
      />

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

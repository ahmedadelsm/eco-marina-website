"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ButtonArrow } from "@/components/Button";
import { DetailHero } from "@/components/DetailHero";
import { useCms } from "@/components/cms/CmsProvider";
import { PageSeo } from "@/components/cms/PageSeo";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { articleJsonLd } from "@/lib/structured-data";

export function InsightDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const { pages } = getContent(locale);
  const { getInsight, ready } = useCms();
  const path = (href: string) => localePath(locale, href);
  const seoPath = locale === "nl" ? `/nl/insights/${slug}` : `/insights/${slug}`;

  const staticArticle = getContent(locale).getInsight(slug);
  const article = getInsight(slug) ?? staticArticle;

  if (ready && !article) notFound();
  if (!article) return null;

  return (
    <>
      <PageSeo path={seoPath} fallbackTitle={article.title} fallbackDescription={article.excerpt} />
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
              {pages.insights.writtenBy}{" "}
              <Link href={path("/about")} className="font-medium text-sea hover:underline">
                Adel Regal
              </Link>
              {pages.insights.founderNote}
            </p>
            <ButtonArrow href={path("/contact")} className="mt-6">
              {pages.insights.discuss}
            </ButtonArrow>
          </div>
        </div>
      </article>
    </>
  );
}

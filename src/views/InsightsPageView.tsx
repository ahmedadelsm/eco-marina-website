"use client";

import { InsightCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { useCms } from "@/components/cms/CmsProvider";
import { PageSeo } from "@/components/cms/PageSeo";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";

export function InsightsPageView({ locale }: { locale: Locale }) {
  const { pages } = getContent(locale);
  const { insights, homepage, pageCopy } = useCms();
  const seoPath = locale === "nl" ? "/nl/insights" : "/insights";

  return (
    <>
      <PageSeo path={seoPath} fallbackTitle={pages.insights.title} fallbackDescription={pages.insights.description} />
      <PageHero eyebrow={pageCopy.insights.eyebrow} title={pageCopy.insights.heading} description={pageCopy.insights.intro} />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {insights.map((article) => (
              <InsightCard key={article.slug} article={article} readLabel={homepage.insightsReadArticle} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

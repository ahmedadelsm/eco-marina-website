"use client";

import { InsightCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { useCms } from "@/components/cms/CmsProvider";
import type { Locale } from "@/lib/i18n";

export function InsightsPageView({ locale }: { locale: Locale }) {
  void locale;
  const { insights, homepage, pageCopy } = useCms();

  return (
    <>
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

import { InsightCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";

export function InsightsPageView({ locale }: { locale: Locale }) {
  const { insights, pages, homePage } = getContent(locale);

  return (
    <>
      <PageHero eyebrow={pages.insights.eyebrow} title={pages.insights.heading} description={pages.insights.intro} />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {insights.map((article) => (
              <InsightCard key={article.slug} article={article} readLabel={homePage.insights.readArticle} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { InsightCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { insights } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights",
  description: "Environmental consulting insights from Eco Marina — sustainable tourism, compliance, and coastal development.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Field notes & perspectives"
        description="Practical insights on environmental consulting, coastal development, and sustainable operations — drawn from decades of international project work."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {insights.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

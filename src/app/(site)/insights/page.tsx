import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { insights } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Environmental consulting insights from Eco Marina — sustainable tourism, compliance, and coastal development.",
};

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
          <div className="grid gap-8 md:grid-cols-2">
            {insights.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group flex flex-col border border-line bg-white"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-paper">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="photo-image object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="photo-tint absolute inset-0" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-light">
                    <span className="font-semibold uppercase tracking-wider text-sea">{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-semibold text-ink group-hover:text-sea">{article.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
                  <span className="mt-4 text-sm font-medium text-sea">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

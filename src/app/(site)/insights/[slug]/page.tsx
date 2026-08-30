import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuildInsight, getBuildInsightSlugs } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { InsightDetailView } from "@/views/InsightDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBuildInsightSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBuildInsight(slug, "en");
  if (!article) return { title: "Insight" };
  return buildPageMetadata({
    locale: "en",
    title: article.title,
    description: article.excerpt,
    path: `/insights/${slug}`,
    image: article.image,
    type: "article",
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getBuildInsight(slug, "en")) notFound();
  return <InsightDetailView locale="en" slug={slug} />;
}

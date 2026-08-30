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
  const article = getBuildInsight(slug, "nl");
  if (!article) return { title: "Inzicht" };
  return buildPageMetadata({
    locale: "nl",
    title: article.title,
    description: article.excerpt,
    path: `/nl/insights/${slug}`,
    image: article.image,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getBuildInsight(slug, "nl")) notFound();
  return <InsightDetailView locale="nl" slug={slug} />;
}

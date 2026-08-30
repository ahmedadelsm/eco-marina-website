import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { InsightDetailView } from "@/views/InsightDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("en").insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getContent("en").getInsight(slug);
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
  if (!getContent("en").getInsight(slug)) notFound();
  return <InsightDetailView locale="en" slug={slug} />;
}

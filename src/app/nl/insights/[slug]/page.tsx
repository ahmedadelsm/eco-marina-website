import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { InsightDetailView } from "@/views/InsightDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("nl").insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getContent("nl").getInsight(slug);
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
  if (!getContent("nl").getInsight(slug)) notFound();
  return <InsightDetailView locale="nl" slug={slug} />;
}

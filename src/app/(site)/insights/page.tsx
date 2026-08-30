import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { InsightsPageView } from "@/views/InsightsPageView";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.insights.title,
  description: pages.insights.description,
  path: "/insights",
});

export default function InsightsPage() {
  return <InsightsPageView locale="en" />;
}

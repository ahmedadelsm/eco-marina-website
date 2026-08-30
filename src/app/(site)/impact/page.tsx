import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactPageView } from "@/views/ImpactPageView";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.impact.title,
  description: pages.impact.description,
  path: "/impact",
});

export default function ImpactPage() {
  return <ImpactPageView locale="en" />;
}

import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesPageView } from "@/views/ResourcesPageView";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.resources.title,
  description: pages.resources.description,
  path: "/resources",
});

export default function ResourcesPage() {
  return <ResourcesPageView locale="en" />;
}

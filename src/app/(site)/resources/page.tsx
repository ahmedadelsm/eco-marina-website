import type { Metadata } from "next";
import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesPageView } from "@/views/ResourcesPageView";

const meta = getBuildListPageMeta("resources", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/resources",
});

export default function ResourcesPage() {
  return <ResourcesPageView locale="en" />;
}

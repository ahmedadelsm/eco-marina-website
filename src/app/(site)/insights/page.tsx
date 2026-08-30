import type { Metadata } from "next";
import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { InsightsPageView } from "@/views/InsightsPageView";

const meta = getBuildListPageMeta("insights", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/insights",
});

export default function InsightsPage() {
  return <InsightsPageView locale="en" />;
}

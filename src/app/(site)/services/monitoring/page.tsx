import type { Metadata } from "next";
import { getBuildServiceDetailMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { MonitoringPageView } from "@/views/MonitoringPageView";

const meta = getBuildServiceDetailMeta("monitoring", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/services/monitoring",
  image: meta?.image,
});

export default function MonitoringPage() {
  return <MonitoringPageView locale="en" />;
}

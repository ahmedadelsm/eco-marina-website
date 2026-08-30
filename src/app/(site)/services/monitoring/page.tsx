import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { MonitoringPageView } from "@/views/MonitoringPageView";

const { pages, coreServices } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.monitoring.title,
  description: pages.monitoring.description,
  path: "/services/monitoring",
  image: coreServices[1].image,
});

export default function MonitoringPage() {
  return <MonitoringPageView locale="en" />;
}

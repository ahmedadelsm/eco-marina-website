import type { Metadata } from "next";
import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPageView } from "@/views/ServicesPageView";

const meta = getBuildListPageMeta("services", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageView locale="en" />;
}

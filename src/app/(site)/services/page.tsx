import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPageView } from "@/views/ServicesPageView";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.services.title,
  description: pages.services.description,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageView locale="en" />;
}

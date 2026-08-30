import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageView } from "@/views/AboutPageView";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.about.title,
  description: pages.about.description,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageView locale="en" />;
}

import type { Metadata } from "next";
import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageView } from "@/views/AboutPageView";

const meta = getBuildListPageMeta("about", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  image: meta?.image,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageView locale="en" />;
}

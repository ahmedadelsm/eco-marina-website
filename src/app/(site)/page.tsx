import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageView } from "@/views/HomePageView";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  description:
    "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.",
  path: "/",
});

export default function HomePage() {
  return <HomePageView locale="en" />;
}

import type { Metadata } from "next";
import { getBuildHomePageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageView } from "@/views/HomePageView";

const meta = getBuildHomePageMeta("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta.title,
  description: meta.description,
  path: "/",
  image: meta.image,
});

export default function HomePage() {
  return <HomePageView locale="en" />;
}

import type { Metadata } from "next";
import { getBuildImpactPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactPageView } from "@/views/ImpactPageView";

const meta = getBuildImpactPageMeta("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/impact",
});

export default function ImpactPage() {
  return <ImpactPageView locale="en" />;
}

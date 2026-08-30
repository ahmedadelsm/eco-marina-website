import type { Metadata } from "next";
import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { FAQContent } from "./FAQContent";

const meta = getBuildListPageMeta("faq", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/faq",
});

export default function FAQPage() {
  return <FAQContent />;
}

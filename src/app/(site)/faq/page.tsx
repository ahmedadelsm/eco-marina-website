import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { FAQContent } from "./FAQContent";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.faq.title,
  description: pages.faq.description,
  path: "/faq",
});

export default function FAQPage() {
  return <FAQContent />;
}

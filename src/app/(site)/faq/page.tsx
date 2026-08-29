import type { Metadata } from "next";
import { FAQContent } from "./FAQContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Eco Marina consulting services, process, and environmental compliance.",
  path: "/faq",
});

export default function FAQPage() {
  return <FAQContent />;
}

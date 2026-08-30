import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactForm";
import { getBuildSeo } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";

const seo = getBuildSeo("/contact", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: seo?.title,
  description: seo?.description,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}

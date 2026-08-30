import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactForm";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";

const { pages, site } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.contact.title,
  description: pages.contact.description.replace("Eco Marina", site.name),
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}

import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactForm";
import { site } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${site.name} for impact assessment, monitoring programs, or training. Free initial consultation.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}

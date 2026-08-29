import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactForm";
import { site } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for impact assessment, monitoring programs, or training. Free initial consultation.`,
};

export default function ContactPage() {
  return <ContactPageContent />;
}

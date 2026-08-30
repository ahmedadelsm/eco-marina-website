import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.contact.title, description: pages.contact.description, path: "/nl/contact" });

import { ContactPageContent } from "@/components/ContactForm";
export default function Page() { return <ContactPageContent />; }

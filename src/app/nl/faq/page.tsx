import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.faq.title, description: pages.faq.description, path: "/nl/faq" });

import { FAQContent } from "@/app/(site)/faq/FAQContent";
export default function Page() { return <FAQContent />; }

import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPageView } from "@/views/ServicesPageView";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.services.title, description: pages.services.description, path: "/nl/services" });

export default function Page() { return <ServicesPageView locale="nl" />; }

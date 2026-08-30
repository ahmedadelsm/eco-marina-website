import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageView } from "@/views/AboutPageView";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.about.title, description: pages.about.description, path: "/nl/about" });

export default function Page() { return <AboutPageView locale="nl" />; }

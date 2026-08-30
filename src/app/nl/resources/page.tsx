import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesPageView } from "@/views/ResourcesPageView";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.resources.title, description: pages.resources.description, path: "/nl/resources" });

export default function Page() { return <ResourcesPageView locale="nl" />; }

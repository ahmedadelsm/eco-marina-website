import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { InsightsPageView } from "@/views/InsightsPageView";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.insights.title, description: pages.insights.description, path: "/nl/insights" });

export default function Page() { return <InsightsPageView locale="nl" />; }

import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { MonitoringPageView } from "@/views/MonitoringPageView";

const { pages, coreServices } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.monitoring.title, description: pages.monitoring.description, path: "/nl/services/monitoring", image: coreServices[1].image });

export default function Page() { return <MonitoringPageView locale="nl" />; }

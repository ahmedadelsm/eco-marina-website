import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactPageView } from "@/views/ImpactPageView";

const { pages } = getContent("nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: pages.impact.title,
  description: pages.impact.description,
  path: "/nl/impact",
});

export default function Page() {
  return <ImpactPageView locale="nl" />;
}

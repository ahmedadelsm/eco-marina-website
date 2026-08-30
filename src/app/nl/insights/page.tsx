import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { InsightsPageView } from "@/views/InsightsPageView";

const meta = getBuildListPageMeta("insights", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  image: meta?.image,
  path: "/nl/insights",
});

export default function Page() {
  return <InsightsPageView locale="nl" />;
}

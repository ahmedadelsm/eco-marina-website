import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesPageView } from "@/views/ResourcesPageView";

const meta = getBuildListPageMeta("resources", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/resources",
});

export default function Page() {
  return <ResourcesPageView locale="nl" />;
}

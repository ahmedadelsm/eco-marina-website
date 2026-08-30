import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPageView } from "@/views/ServicesPageView";

const meta = getBuildListPageMeta("services", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/services",
});

export default function Page() {
  return <ServicesPageView locale="nl" />;
}

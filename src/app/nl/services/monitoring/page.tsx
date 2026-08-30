import { getBuildServiceDetailMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { MonitoringPageView } from "@/views/MonitoringPageView";

const meta = getBuildServiceDetailMeta("monitoring", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/services/monitoring",
  image: meta?.image,
});

export default function Page() {
  return <MonitoringPageView locale="nl" />;
}

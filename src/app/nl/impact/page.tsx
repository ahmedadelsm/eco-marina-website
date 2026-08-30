import { getBuildImpactPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactPageView } from "@/views/ImpactPageView";

const meta = getBuildImpactPageMeta("nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/impact",
});

export default function Page() {
  return <ImpactPageView locale="nl" />;
}

import { getBuildServiceDetailMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactAssessmentPageView } from "@/views/ImpactAssessmentPageView";

const meta = getBuildServiceDetailMeta("impact-assessment", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/services/impact-assessment",
  image: meta?.image,
});

export default function Page() {
  return <ImpactAssessmentPageView locale="nl" />;
}

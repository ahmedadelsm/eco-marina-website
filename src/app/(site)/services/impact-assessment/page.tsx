import type { Metadata } from "next";
import { getBuildServiceDetailMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactAssessmentPageView } from "@/views/ImpactAssessmentPageView";

const meta = getBuildServiceDetailMeta("impact-assessment", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/services/impact-assessment",
  image: meta?.image,
});

export default function ImpactAssessmentPage() {
  return <ImpactAssessmentPageView locale="en" />;
}

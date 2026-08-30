import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactAssessmentPageView } from "@/views/ImpactAssessmentPageView";

const { pages, coreServices } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.impactAssessment.title,
  description: pages.impactAssessment.description,
  path: "/services/impact-assessment",
  image: coreServices[0].image,
});

export default function ImpactAssessmentPage() {
  return <ImpactAssessmentPageView locale="en" />;
}

import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactAssessmentPageView } from "@/views/ImpactAssessmentPageView";

const { pages, coreServices } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.impactAssessment.title, description: pages.impactAssessment.description, path: "/nl/services/impact-assessment", image: coreServices[0].image });

export default function Page() { return <ImpactAssessmentPageView locale="nl" />; }

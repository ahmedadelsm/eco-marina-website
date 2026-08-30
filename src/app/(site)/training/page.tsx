import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { TrainingPageView } from "@/views/TrainingPageView";

const { coreServices } = getContent("en");
const service = coreServices[2];

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: "Training & Workshops",
  description: service.description,
  path: "/training",
  image: service.image,
});

export default function TrainingPage() {
  return <TrainingPageView locale="en" />;
}

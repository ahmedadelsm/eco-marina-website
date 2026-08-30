import type { Metadata } from "next";
import { getBuildTrainingPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { TrainingPageView } from "@/views/TrainingPageView";

const meta = getBuildTrainingPageMeta("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/training",
  image: meta?.image,
});

export default function TrainingPage() {
  return <TrainingPageView locale="en" />;
}

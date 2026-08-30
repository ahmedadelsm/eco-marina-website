import { getBuildTrainingPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { TrainingPageView } from "@/views/TrainingPageView";

const meta = getBuildTrainingPageMeta("nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/training",
  image: meta?.image,
});

export default function Page() {
  return <TrainingPageView locale="nl" />;
}

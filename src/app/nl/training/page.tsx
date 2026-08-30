import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { TrainingPageView } from "@/views/TrainingPageView";

const { pages, coreServices } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.training.title, description: coreServices[2].description, path: "/nl/training", image: coreServices[2].image });

export default function Page() { return <TrainingPageView locale="nl" />; }

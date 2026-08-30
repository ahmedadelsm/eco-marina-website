import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageView } from "@/views/HomePageView";

const { site } = getContent("nl");
export const metadata = buildPageMetadata({
  locale: "nl",
  description: "Milieu- en sociale effectbeoordeling, monitoringprogramma's en duurzaamheidstraining. Gevestigd in Utrecht, Nederland.",
  path: "/nl",
});

export default function Page() { return <HomePageView locale="nl" />; }

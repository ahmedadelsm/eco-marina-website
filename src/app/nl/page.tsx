import { getBuildHomePageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageView } from "@/views/HomePageView";

const meta = getBuildHomePageMeta("nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta.title,
  description: meta.description,
  path: "/nl",
  image: meta.image,
});

export default function Page() {
  return <HomePageView locale="nl" />;
}

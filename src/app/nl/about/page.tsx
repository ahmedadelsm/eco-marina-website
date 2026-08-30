import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageView } from "@/views/AboutPageView";

const meta = getBuildListPageMeta("about", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  image: meta?.image,
  path: "/nl/about",
});

export default function Page() {
  return <AboutPageView locale="nl" />;
}

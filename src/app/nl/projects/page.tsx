import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectsPageView } from "@/views/ProjectsPageView";

const meta = getBuildListPageMeta("projects", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/projects",
  image: meta?.image ?? "/images/projects/shipping-agency.jpg",
});

export default function Page() {
  return <ProjectsPageView locale="nl" />;
}

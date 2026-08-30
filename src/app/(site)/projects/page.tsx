import type { Metadata } from "next";
import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectsPageView } from "@/views/ProjectsPageView";

const meta = getBuildListPageMeta("projects", "en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: meta?.title,
  description: meta?.description,
  path: "/projects",
  image: "/images/projects/shipping-agency.jpg",
});

export default function ProjectsPage() {
  return <ProjectsPageView locale="en" />;
}

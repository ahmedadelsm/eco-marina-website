import type { Metadata } from "next";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectsPageView } from "@/views/ProjectsPageView";

const { pages } = getContent("en");

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  title: pages.projects.title,
  description: pages.projects.description,
  path: "/projects",
  image: "/images/projects/shipping-agency.jpg",
});

export default function ProjectsPage() {
  return <ProjectsPageView locale="en" />;
}

import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectsPageView } from "@/views/ProjectsPageView";

const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.projects.title, description: pages.projects.description, path: "/nl/projects", image: "/images/projects/shipping-agency.jpg" });

export default function Page() { return <ProjectsPageView locale="nl" />; }

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuildProject, getBuildProjectSlugs } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectDetailView } from "@/views/ProjectDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBuildProjectSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getBuildProject(slug, "nl");
  if (!project) return { title: "Casestudy" };
  return buildPageMetadata({
    locale: "nl",
    title: project.title,
    description: project.summary,
    path: `/nl/projects/${slug}`,
    image: project.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getBuildProject(slug, "nl")) notFound();
  return <ProjectDetailView locale="nl" slug={slug} />;
}

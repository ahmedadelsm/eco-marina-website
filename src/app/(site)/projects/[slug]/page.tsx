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
  const project = getBuildProject(slug, "en");
  if (!project) return { title: "Case Study" };
  return buildPageMetadata({
    locale: "en",
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getBuildProject(slug, "en")) notFound();
  return <ProjectDetailView locale="en" slug={slug} />;
}

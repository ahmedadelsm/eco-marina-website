import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectDetailView } from "@/views/ProjectDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("en").projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent("en").getProject(slug);
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
  if (!getContent("en").getProject(slug)) notFound();
  return <ProjectDetailView locale="en" slug={slug} />;
}

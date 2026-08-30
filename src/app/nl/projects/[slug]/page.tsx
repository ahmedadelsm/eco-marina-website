import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectDetailView } from "@/views/ProjectDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("nl").projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent("nl").getProject(slug);
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
  if (!getContent("nl").getProject(slug)) notFound();
  return <ProjectDetailView locale="nl" slug={slug} />;
}

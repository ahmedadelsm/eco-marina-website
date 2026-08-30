"use client";

import { useSlugFromPath } from "@/hooks/useSlugFromPath";
import { ProjectDetailView } from "@/views/ProjectDetailView";
import { InsightDetailView } from "@/views/InsightDetailView";
import { notFound } from "next/navigation";

export function ProjectDetailCatchAll({ locale }: { locale: "en" | "nl" }) {
  const prefix = locale === "nl" ? "/nl/projects" : "/projects";
  const slug = useSlugFromPath(prefix);
  if (!slug) notFound();
  return <ProjectDetailView locale={locale} slug={slug} />;
}

export function InsightDetailCatchAll({ locale }: { locale: "en" | "nl" }) {
  const prefix = locale === "nl" ? "/nl/insights" : "/insights";
  const slug = useSlugFromPath(prefix);
  if (!slug) notFound();
  return <InsightDetailView locale={locale} slug={slug} />;
}

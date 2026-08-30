#!/usr/bin/env node
/**
 * Scaffolds Dutch (/nl) page wrappers that mirror English routes.
 * Uses build-cms helpers for metadata (same patterns as src/app/nl/*).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const NL_APP = path.join(ROOT, "src/app/nl");

const routes = [
  {
    dir: "",
    view: "HomePageView",
    imports: `import { buildPageMetadata } from "@/lib/seo";
import { HomePageView } from "@/views/HomePageView";`,
    meta: `export const metadata = buildPageMetadata({
  locale: "nl",
  description: "Milieu- en sociale effectbeoordeling, monitoringprogramma's en duurzaamheidstraining. Gevestigd in Utrecht, Nederland.",
  path: "/nl",
});`,
    body: `export default function Page() { return <HomePageView locale="nl" />; }`,
  },
  {
    dir: "about",
    view: "AboutPageView",
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageView } from "@/views/AboutPageView";`,
    meta: `const meta = getBuildListPageMeta("about", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/about",
});`,
    body: `export default function Page() { return <AboutPageView locale="nl" />; }`,
  },
  {
    dir: "contact",
    view: null,
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageContent } from "@/components/ContactForm";`,
    meta: `const meta = getBuildListPageMeta("contact", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/contact",
});`,
    body: `export default function Page() { return <ContactPageContent />; }`,
  },
  {
    dir: "faq",
    view: null,
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { FAQContent } from "@/app/(site)/faq/FAQContent";`,
    meta: `const meta = getBuildListPageMeta("faq", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/faq",
});`,
    body: `export default function Page() { return <FAQContent />; }`,
  },
  {
    dir: "training",
    view: "TrainingPageView",
    imports: `import { getBuildTrainingPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { TrainingPageView } from "@/views/TrainingPageView";`,
    meta: `const meta = getBuildTrainingPageMeta("nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/training",
  image: meta?.image,
});`,
    body: `export default function Page() { return <TrainingPageView locale="nl" />; }`,
  },
  {
    dir: "services",
    view: "ServicesPageView",
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPageView } from "@/views/ServicesPageView";`,
    meta: `const meta = getBuildListPageMeta("services", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/services",
});`,
    body: `export default function Page() { return <ServicesPageView locale="nl" />; }`,
  },
  {
    dir: "services/impact-assessment",
    view: "ImpactAssessmentPageView",
    imports: `import { getBuildServiceDetailMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ImpactAssessmentPageView } from "@/views/ImpactAssessmentPageView";`,
    meta: `const meta = getBuildServiceDetailMeta("impact-assessment", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/services/impact-assessment",
  image: meta?.image,
});`,
    body: `export default function Page() { return <ImpactAssessmentPageView locale="nl" />; }`,
  },
  {
    dir: "services/monitoring",
    view: "MonitoringPageView",
    imports: `import { getBuildServiceDetailMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { MonitoringPageView } from "@/views/MonitoringPageView";`,
    meta: `const meta = getBuildServiceDetailMeta("monitoring", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/services/monitoring",
  image: meta?.image,
});`,
    body: `export default function Page() { return <MonitoringPageView locale="nl" />; }`,
  },
  {
    dir: "projects",
    view: "ProjectsPageView",
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectsPageView } from "@/views/ProjectsPageView";`,
    meta: `const meta = getBuildListPageMeta("projects", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/projects",
  image: "/images/projects/shipping-agency.jpg",
});`,
    body: `export default function Page() { return <ProjectsPageView locale="nl" />; }`,
  },
  {
    dir: "insights",
    view: "InsightsPageView",
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { InsightsPageView } from "@/views/InsightsPageView";`,
    meta: `const meta = getBuildListPageMeta("insights", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/insights",
});`,
    body: `export default function Page() { return <InsightsPageView locale="nl" />; }`,
  },
  {
    dir: "resources",
    view: "ResourcesPageView",
    imports: `import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesPageView } from "@/views/ResourcesPageView";`,
    meta: `const meta = getBuildListPageMeta("resources", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/resources",
});`,
    body: `export default function Page() { return <ResourcesPageView locale="nl" />; }`,
  },
];

for (const route of routes) {
  const dir = path.join(NL_APP, route.dir);
  fs.mkdirSync(dir, { recursive: true });
  const content = `${route.imports}

${route.meta}

${route.body}
`;
  fs.writeFileSync(path.join(dir, "page.tsx"), content);
}

const projectSlugDir = path.join(NL_APP, "projects/[slug]");
fs.mkdirSync(projectSlugDir, { recursive: true });
fs.writeFileSync(
  path.join(projectSlugDir, "page.tsx"),
  `import type { Metadata } from "next";
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
    path: \`/nl/projects/\${slug}\`,
    image: project.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getBuildProject(slug, "nl")) notFound();
  return <ProjectDetailView locale="nl" slug={slug} />;
}
`,
);

const insightSlugDir = path.join(NL_APP, "insights/[slug]");
fs.mkdirSync(insightSlugDir, { recursive: true });
fs.writeFileSync(
  path.join(insightSlugDir, "page.tsx"),
  `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuildInsight, getBuildInsightSlugs } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { InsightDetailView } from "@/views/InsightDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBuildInsightSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBuildInsight(slug, "nl");
  if (!article) return { title: "Inzicht" };
  return buildPageMetadata({
    locale: "nl",
    title: article.title,
    description: article.excerpt,
    path: \`/nl/insights/\${slug}\`,
    image: article.image,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getBuildInsight(slug, "nl")) notFound();
  return <InsightDetailView locale="nl" slug={slug} />;
}
`,
);

console.log("Scaffolded Dutch routes under src/app/nl/");

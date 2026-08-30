#!/usr/bin/env node
/**
 * Scaffolds Dutch (/nl) page wrappers that mirror English routes.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const NL_APP = path.join(ROOT, "src/app/nl");

const routes = [
  {
    dir: "",
    view: "HomePageView",
    importPath: "@/views/HomePageView",
    meta: `const { site } = getContent("nl");
export const metadata = buildPageMetadata({
  locale: "nl",
  description: "Milieu- en sociale effectbeoordeling, monitoringprogramma's en duurzaamheidstraining. Gevestigd in Utrecht, Nederland.",
  path: "/nl",
});`,
    body: `export default function Page() { return <HomePageView locale="nl" />; }`,
  },
  {
    dir: "about",
    view: "AboutPageView",
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.about.title, description: pages.about.description, path: "/nl/about" });`,
    body: `export default function Page() { return <AboutPageView locale="nl" />; }`,
  },
  {
    dir: "contact",
    view: null,
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.contact.title, description: pages.contact.description, path: "/nl/contact" });`,
    body: `import { ContactPageContent } from "@/components/ContactForm";
export default function Page() { return <ContactPageContent />; }`,
  },
  {
    dir: "faq",
    view: null,
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.faq.title, description: pages.faq.description, path: "/nl/faq" });`,
    body: `import { FAQContent } from "@/app/(site)/faq/FAQContent";
export default function Page() { return <FAQContent />; }`,
  },
  {
    dir: "training",
    view: "TrainingPageView",
    meta: `const { pages, coreServices } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.training.title, description: coreServices[2].description, path: "/nl/training", image: coreServices[2].image });`,
    body: `export default function Page() { return <TrainingPageView locale="nl" />; }`,
  },
  {
    dir: "services",
    view: "ServicesPageView",
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.services.title, description: pages.services.description, path: "/nl/services" });`,
    body: `export default function Page() { return <ServicesPageView locale="nl" />; }`,
  },
  {
    dir: "services/impact-assessment",
    view: "ImpactAssessmentPageView",
    meta: `const { pages, coreServices } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.impactAssessment.title, description: pages.impactAssessment.description, path: "/nl/services/impact-assessment", image: coreServices[0].image });`,
    body: `export default function Page() { return <ImpactAssessmentPageView locale="nl" />; }`,
  },
  {
    dir: "services/monitoring",
    view: "MonitoringPageView",
    meta: `const { pages, coreServices } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.monitoring.title, description: pages.monitoring.description, path: "/nl/services/monitoring", image: coreServices[1].image });`,
    body: `export default function Page() { return <MonitoringPageView locale="nl" />; }`,
  },
  {
    dir: "projects",
    view: "ProjectsPageView",
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.projects.title, description: pages.projects.description, path: "/nl/projects", image: "/images/projects/shipping-agency.jpg" });`,
    body: `export default function Page() { return <ProjectsPageView locale="nl" />; }`,
  },
  {
    dir: "insights",
    view: "InsightsPageView",
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.insights.title, description: pages.insights.description, path: "/nl/insights" });`,
    body: `export default function Page() { return <InsightsPageView locale="nl" />; }`,
  },
  {
    dir: "resources",
    view: "ResourcesPageView",
    meta: `const { pages } = getContent("nl");
export const metadata = buildPageMetadata({ locale: "nl", title: pages.resources.title, description: pages.resources.description, path: "/nl/resources" });`,
    body: `export default function Page() { return <ResourcesPageView locale="nl" />; }`,
  },
];

for (const route of routes) {
  const dir = path.join(NL_APP, route.dir);
  fs.mkdirSync(dir, { recursive: true });
  const viewImport = route.view ? `import { ${route.view} } from "@/views/${route.view}";\n` : "";
  const content = `import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
${viewImport}
${route.meta}

${route.body}
`;
  fs.writeFileSync(path.join(dir, "page.tsx"), content);
}

// Dynamic project slug page
const projectSlugDir = path.join(NL_APP, "projects/[slug]");
fs.mkdirSync(projectSlugDir, { recursive: true });
fs.writeFileSync(
  path.join(projectSlugDir, "page.tsx"),
  `import type { Metadata } from "next";
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
    path: \`/nl/projects/\${slug}\`,
    image: project.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getContent("nl").getProject(slug)) notFound();
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
import { getContent } from "@/content";
import { buildPageMetadata } from "@/lib/seo";
import { InsightDetailView } from "@/views/InsightDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("nl").insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getContent("nl").getInsight(slug);
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
  if (!getContent("nl").getInsight(slug)) notFound();
  return <InsightDetailView locale="nl" slug={slug} />;
}
`,
);

console.log("Scaffolded Dutch routes under src/app/nl/");

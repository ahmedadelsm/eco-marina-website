import fs from "fs";
import path from "path";
import { mergeCmsWithDefaults } from "@/lib/cms/registry";
import type {
  CmsCompany,
  CmsInsight,
  CmsPages,
  CmsProject,
  CmsResources,
  CmsSeoEntry,
} from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

type StoredBuildCms = {
  source?: "api" | "defaults";
  fetchedAt?: string;
  projects?: CmsProject[] | null;
  insights?: CmsInsight[] | null;
  company?: CmsCompany | null;
  seo?: CmsSeoEntry[] | null;
  pages?: CmsPages | null;
  resources?: CmsResources | null;
};

type ResolvedBuildCms = {
  projects: CmsProject[];
  insights: CmsInsight[];
  company: CmsCompany;
  seo: CmsSeoEntry[];
  pages: CmsPages;
  resources: CmsResources;
};

let cached: ResolvedBuildCms | null = null;

function loadStored(): StoredBuildCms | null {
  try {
    const filePath = path.join(process.cwd(), "src/generated/build-cms.json");
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as StoredBuildCms;
  } catch {
    return null;
  }
}

function resolveBuildCms(): ResolvedBuildCms {
  if (cached) return cached;

  const stored = loadStored();
  cached = {
    projects: mergeCmsWithDefaults("projects", stored?.projects ?? null),
    insights: mergeCmsWithDefaults("insights", stored?.insights ?? null),
    company: mergeCmsWithDefaults("company", stored?.company ?? null),
    seo: mergeCmsWithDefaults("seo", stored?.seo ?? null),
    pages: mergeCmsWithDefaults("pages", stored?.pages ?? null),
    resources: mergeCmsWithDefaults("resources", stored?.resources ?? null),
  };

  return cached;
}

export function getBuildProjectSlugs(): { slug: string }[] {
  return resolveBuildCms()
    .projects.filter((project) => project.published)
    .map((project) => ({ slug: project.slug }));
}

export function getBuildInsightSlugs(): { slug: string }[] {
  return resolveBuildCms()
    .insights.filter((insight) => insight.published)
    .map((insight) => ({ slug: insight.slug }));
}

export function getBuildProject(slug: string, locale: Locale) {
  const project = resolveBuildCms().projects.find((item) => item.slug === slug && item.published);
  if (!project) return undefined;
  return {
    slug: project.slug,
    title: pickText(project.title, locale),
    summary: pickText(project.summary, locale),
    image: project.image,
  };
}

export function getBuildInsight(slug: string, locale: Locale) {
  const insight = resolveBuildCms().insights.find((item) => item.slug === slug && item.published);
  if (!insight) return undefined;
  return {
    slug: insight.slug,
    title: pickText(insight.title, locale),
    excerpt: pickText(insight.excerpt, locale),
    image: insight.image,
    datePublished: insight.datePublished,
  };
}

export function getBuildCompany(locale: Locale) {
  const company = resolveBuildCms().company;
  return {
    name: pickText(company.name, locale),
    tagline: pickText(company.tagline, locale),
    email: company.email,
    phone: company.phone,
    office: pickText(company.office, locale),
    domain: company.domain,
    operatingRegions: pickList(company.operatingRegions, locale),
  };
}

export function getBuildSeo(path: string, locale: Locale) {
  return getSeoForPath(resolveBuildCms().seo, path, locale);
}

export function getBuildListPageMeta(
  page: "projects" | "insights" | "services" | "resources" | "faq" | "contact" | "about" | "training",
  locale: Locale,
) {
  const seoPath =
    page === "projects"
      ? locale === "nl"
        ? "/nl/projects"
        : "/projects"
      : page === "insights"
        ? locale === "nl"
          ? "/nl/insights"
          : "/insights"
        : page === "services"
          ? locale === "nl"
            ? "/nl/services"
            : "/services"
          : page === "resources"
            ? locale === "nl"
              ? "/nl/resources"
              : "/resources"
              : page === "faq"
                ? locale === "nl"
                  ? "/nl/faq"
                  : "/faq"
                : page === "contact"
                  ? locale === "nl"
                    ? "/nl/contact"
                    : "/contact"
                  : page === "about"
                    ? locale === "nl"
                      ? "/nl/about"
                      : "/about"
                    : locale === "nl"
                      ? "/nl/training"
                      : "/training";

  const seo = getBuildSeo(seoPath, locale);
  if (seo) return seo;

  const { pages, resources } = resolveBuildCms();
  if (page === "resources") {
    return {
      title: pickText(resources.heading, locale),
      description: pickText(resources.intro, locale),
    };
  }
  if (page === "projects") {
    return {
      title: pickText(pages.projects.heading, locale),
      description: pickText(pages.projects.intro, locale),
    };
  }
  if (page === "insights") {
    return {
      title: pickText(pages.insights.heading, locale),
      description: pickText(pages.insights.intro, locale),
    };
  }
  if (page === "services") {
    return {
      title: pickText(pages.services.heading, locale),
      description: pickText(pages.services.heading, locale),
    };
  }
  if (page === "faq") {
    return {
      title: pickText(pages.faq.heading, locale),
      description: pickText(pages.faq.heading, locale),
    };
  }

  return null;
}

import fs from "fs";
import path from "path";
import { getSeoForPath, pickList, pickText } from "@/lib/cms/localize";
import { mergeCmsWithDefaults } from "@/lib/cms/registry";
import type {
  CmsCompany,
  CmsInsight,
  CmsPages,
  CmsProject,
  CmsResources,
  CmsSeoEntry,
  CmsServices,
  CmsTrainingPage,
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
  services?: CmsServices | null;
  trainingPage?: CmsTrainingPage | null;
};

type ResolvedBuildCms = {
  projects: CmsProject[];
  insights: CmsInsight[];
  company: CmsCompany;
  seo: CmsSeoEntry[];
  pages: CmsPages;
  resources: CmsResources;
  services: CmsServices;
  trainingPage: CmsTrainingPage;
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
    services: mergeCmsWithDefaults("services", stored?.services ?? null),
    trainingPage: mergeCmsWithDefaults("training-page", stored?.trainingPage ?? null),
  };

  return cached;
}

function seoPathFor(page: string, locale: Locale): string {
  const base =
    page === "projects"
      ? "/projects"
      : page === "insights"
        ? "/insights"
        : page === "services"
          ? "/services"
          : page === "resources"
            ? "/resources"
            : page === "faq"
              ? "/faq"
              : page === "contact"
                ? "/contact"
                : page === "about"
                  ? "/about"
                  : page === "training"
                    ? "/training"
                    : page === "impact-assessment"
                      ? "/services/impact-assessment"
                      : page === "monitoring"
                        ? "/services/monitoring"
                        : "/";

  return locale === "nl" && base !== "/" ? `/nl${base}` : base;
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

export function getBuildCoreService(slug: string, locale: Locale) {
  const service = resolveBuildCms().services.coreServices.find((item) => item.slug === slug);
  if (!service) return undefined;
  return {
    slug: service.slug,
    title: pickText(service.title, locale),
    description: pickText(service.description, locale),
    tagline: pickText(service.tagline, locale),
    image: service.image,
  };
}

export function getBuildTrainingPageMeta(locale: Locale) {
  const seo = getBuildSeo(seoPathFor("training", locale), locale);
  if (seo) return { ...seo, image: getBuildCoreService("training", locale)?.image };

  const { trainingPage } = resolveBuildCms();
  const service = getBuildCoreService("training", locale);
  return {
    title: pickText(trainingPage.title, locale),
    description: pickText(trainingPage.description, locale),
    image: service?.image,
  };
}

export function getBuildServiceDetailMeta(slug: "impact-assessment" | "monitoring", locale: Locale) {
  const pageKey = slug === "impact-assessment" ? "impact-assessment" : "monitoring";
  const seo = getBuildSeo(seoPathFor(pageKey, locale), locale);
  const service = getBuildCoreService(slug, locale);
  if (seo) return { ...seo, image: service?.image };
  if (!service) return null;
  return {
    title: service.title,
    description: service.description,
    image: service.image,
  };
}

export function getBuildListPageMeta(
  page: "projects" | "insights" | "services" | "resources" | "faq" | "contact" | "about" | "training",
  locale: Locale,
) {
  const seo = getBuildSeo(seoPathFor(page, locale), locale);
  if (seo) return seo;

  const { pages, resources, trainingPage } = resolveBuildCms();
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
    const { services } = resolveBuildCms();
    return {
      title: pickText(pages.services.heading, locale),
      description: pickText(services.intro, locale),
    };
  }
  if (page === "faq") {
    const seoEntry = resolveBuildCms().seo.find((item) => item.path === "/faq");
    return {
      title: pickText(pages.faq.heading, locale),
      description: seoEntry ? pickText(seoEntry.description, locale) : pickText(pages.faq.heading, locale),
    };
  }
  if (page === "about") {
    const seoEntry = resolveBuildCms().seo.find((item) => item.path === "/about");
    return {
      title: seoEntry ? pickText(seoEntry.title, locale) : pickText(pages.about.eyebrow, locale),
      description: seoEntry ? pickText(seoEntry.description, locale) : "",
    };
  }
  if (page === "contact") {
    const seoEntry = resolveBuildCms().seo.find((item) => item.path === "/contact");
    return {
      title: seoEntry ? pickText(seoEntry.title, locale) : (locale === "nl" ? "Contact" : "Contact"),
      description: seoEntry ? pickText(seoEntry.description, locale) : "",
    };
  }
  if (page === "training") {
    return {
      title: pickText(trainingPage.title, locale),
      description: pickText(trainingPage.description, locale),
    };
  }

  return null;
}

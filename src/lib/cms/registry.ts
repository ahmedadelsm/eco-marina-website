import {
  defaultCmsAbout,
  defaultCmsContact,
  defaultCmsHero,
  defaultCmsHomepage,
  defaultCmsInsights,
  defaultCmsNavigation,
  defaultCmsPages,
  defaultCmsPartners,
  defaultCmsResources,
  defaultCmsSeo,
  defaultCmsServices,
  defaultCmsTrainingPage,
} from "./defaults-extra";
import {
  defaultCmsCompany,
  defaultCmsFaq,
  defaultCmsProjects,
  defaultCmsTraining,
} from "./defaults";
import type { CmsCollection } from "./types";

const DEFAULTS: Record<CmsCollection, () => unknown> = {
  projects: defaultCmsProjects,
  training: defaultCmsTraining,
  faq: defaultCmsFaq,
  company: defaultCmsCompany,
  insights: defaultCmsInsights,
  about: defaultCmsAbout,
  homepage: defaultCmsHomepage,
  seo: defaultCmsSeo,
  services: defaultCmsServices,
  partners: defaultCmsPartners,
  contact: defaultCmsContact,
  resources: defaultCmsResources,
  "training-page": defaultCmsTrainingPage,
  hero: defaultCmsHero,
  pages: defaultCmsPages,
  navigation: defaultCmsNavigation,
};

const OBJECT_COLLECTIONS = new Set<CmsCollection>([
  "company",
  "about",
  "homepage",
  "services",
  "contact",
  "resources",
  "training-page",
  "hero",
  "pages",
  "navigation",
]);

export function getCmsDefault<T>(collection: CmsCollection): T {
  return DEFAULTS[collection]() as T;
}

export function mergeCmsWithDefaults<T>(collection: CmsCollection, data: T | null): T {
  const defaults = getCmsDefault<T>(collection);
  if (!data) return defaults;
  if (OBJECT_COLLECTIONS.has(collection) && typeof defaults === "object" && defaults !== null && !Array.isArray(defaults)) {
    return { ...defaults, ...data };
  }
  return data;
}

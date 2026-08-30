import {
  defaultCmsAbout,
  defaultCmsHomepage,
  defaultCmsInsights,
  defaultCmsSeo,
  defaultCmsServices,
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
};

export function getCmsDefault<T>(collection: CmsCollection): T {
  return DEFAULTS[collection]() as T;
}

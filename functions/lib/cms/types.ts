export type CmsCollection =
  | "projects"
  | "training"
  | "faq"
  | "company"
  | "insights"
  | "about"
  | "homepage"
  | "seo"
  | "services";

export type LocalizedText = { en: string; nl: string };
export type LocalizedList = { en: string[]; nl: string[] };

export interface CmsProject {
  id: string;
  slug: string;
  published: boolean;
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  location: LocalizedText;
  client: LocalizedText;
  challenge: LocalizedText;
  approach: LocalizedList;
  outcomes: LocalizedList;
  services: LocalizedList;
}

export interface CmsTrainingCourse {
  id: string;
  published: boolean;
  duration: LocalizedText;
  format: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  topics: LocalizedList;
  audience: LocalizedText;
  experience: LocalizedText;
  pricing: LocalizedText;
  schedule: LocalizedText;
}

export interface CmsFaqItem {
  id: string;
  q: LocalizedText;
  a: LocalizedText;
}

export interface CmsFaqSection {
  id: string;
  category: LocalizedText;
  questions: CmsFaqItem[];
}

export interface CmsCompany {
  tagline: LocalizedText;
  motto: LocalizedText;
  linkedIn: string;
  since: number;
  statsProjects: number;
  statsCountries: number;
}

export interface CmsInsightSection {
  id: string;
  heading: LocalizedText;
  body: LocalizedText;
}

export interface CmsInsight {
  id: string;
  slug: string;
  published: boolean;
  category: LocalizedText;
  readTime: LocalizedText;
  date: LocalizedText;
  datePublished: string;
  image: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  sections: CmsInsightSection[];
}

export interface CmsTimelineItem {
  id: string;
  period: LocalizedText;
  label: LocalizedText;
}

export interface CmsAbout {
  name: LocalizedText;
  title: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  bioShort: LocalizedText;
  bioLong: LocalizedList;
  credentials: LocalizedList;
  timeline: CmsTimelineItem[];
  focus: LocalizedList;
  countries: LocalizedList;
  quote: LocalizedText;
  quoteSource: LocalizedText;
  mission: LocalizedText;
  approach: LocalizedText;
  values: LocalizedList;
}

export interface CmsHomepage {
  servicesEyebrow: LocalizedText;
  servicesTitle: LocalizedText;
  servicesDescription: LocalizedText;
  missionEyebrow: LocalizedText;
  missionTitle: LocalizedText;
  missionValuesTitle: LocalizedText;
  missionText: LocalizedText;
  missionApproach: LocalizedText;
  whyUsEyebrow: LocalizedText;
  whyUsTitle: LocalizedText;
  casesEyebrow: LocalizedText;
  casesTitle: LocalizedText;
  casesDescription: LocalizedText;
}

export interface CmsSeoEntry {
  path: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
}

export interface CmsCoreService {
  id: string;
  slug: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  href: string;
  image: string;
  deliverables: LocalizedList;
  sectors: LocalizedList;
}

export interface CmsServices {
  intro: LocalizedText;
  coreTitle: LocalizedText;
  specialistTitle: LocalizedText;
  specialistIntro: LocalizedText;
  legacyTitle: LocalizedText;
  legacyIntro: LocalizedText;
  cta: LocalizedText;
  coreServices: CmsCoreService[];
}

export interface CmsMediaItem {
  key: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export const CMS_COLLECTIONS = new Set<CmsCollection>([
  "projects",
  "training",
  "faq",
  "company",
  "insights",
  "about",
  "homepage",
  "seo",
  "services",
]);

export function cmsStorageKey(collection: CmsCollection): string {
  return `cms.${collection}`;
}

export type CmsCollection =
  | "projects"
  | "training"
  | "faq"
  | "company"
  | "insights"
  | "about"
  | "homepage"
  | "seo"
  | "services"
  | "partners"
  | "contact"
  | "resources"
  | "training-page";

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

export interface CmsWhyUsCard {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface CmsProcessStep {
  id: string;
  step: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
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
  whyUsCards: CmsWhyUsCard[];
  casesEyebrow: LocalizedText;
  casesTitle: LocalizedText;
  casesDescription: LocalizedText;
  legacyEyebrow: LocalizedText;
  legacyTitle: LocalizedText;
  legacyDescription: LocalizedText;
  processEyebrow: LocalizedText;
  processTitle: LocalizedText;
  processSteps: CmsProcessStep[];
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

export interface CmsServiceCategory {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  items: LocalizedList;
  image: string;
}

export interface CmsLegacyService {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  href: string;
}

export interface CmsServices {
  intro: LocalizedText;
  coreTitle: LocalizedText;
  specialistTitle: LocalizedText;
  specialistIntro: LocalizedText;
  specialistCategories: CmsServiceCategory[];
  legacyTitle: LocalizedText;
  legacyIntro: LocalizedText;
  legacyServices: CmsLegacyService[];
  cta: LocalizedText;
  coreServices: CmsCoreService[];
}

export interface CmsPartner {
  id: string;
  published: boolean;
  name: LocalizedText;
  location: LocalizedText;
  logo?: string;
}

export interface CmsContactServiceOption {
  id: string;
  value: string;
  label: LocalizedText;
}

export interface CmsContact {
  pageIntro: LocalizedText;
  responseTime: LocalizedText;
  serviceOptions: CmsContactServiceOption[];
}

export interface CmsResourceItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface CmsResourceGroup {
  id: string;
  category: LocalizedText;
  items: CmsResourceItem[];
}

export interface CmsResources {
  intro: LocalizedText;
  requestTitle: LocalizedText;
  requestIntro: LocalizedText;
  groups: CmsResourceGroup[];
}

export interface CmsTrainingPage {
  title: LocalizedText;
  description: LocalizedText;
}

export interface CmsMediaItem {
  key: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface CmsPayload {
  projects: CmsProject[] | null;
  training: CmsTrainingCourse[] | null;
  faq: CmsFaqSection[] | null;
  company: CmsCompany | null;
  insights: CmsInsight[] | null;
  about: CmsAbout | null;
  homepage: CmsHomepage | null;
  seo: CmsSeoEntry[] | null;
  services: CmsServices | null;
  partners: CmsPartner[] | null;
  contact: CmsContact | null;
  resources: CmsResources | null;
  trainingPage: CmsTrainingPage | null;
}

export interface ProjectView {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  location: string;
  client: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  services: string[];
}

export interface TrainingCourseView {
  id: string;
  title: string;
  duration: string;
  format: string;
  description: string;
  topics: string[];
  audience: string;
  experience: string;
  pricing: string;
  schedule: string;
  image: string;
  imageAlt: string;
}

export interface FaqSectionView {
  category: string;
  questions: { q: string; a: string }[];
}

export interface InsightView {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  datePublished: string;
  image: string;
  sections: { heading: string; body: string }[];
}

export interface CoreServiceView {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  href: string;
  icon: "assessment" | "monitoring" | "training";
  image: string;
  deliverables: string[];
  sectors: string[];
}

export interface WhyUsCardView {
  title: string;
  description: string;
}

export interface ProcessStepView {
  step: string;
  title: string;
  description: string;
}

export interface ServiceCategoryView {
  title: string;
  description: string;
  items: string[];
  image: string;
}

export interface LegacyServiceView {
  slug: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface PartnerView {
  id: string;
  name: string;
  location: string;
  logo?: string;
}

export interface ContactServiceOptionView {
  value: string;
  label: string;
}

export interface ResourceItemView {
  title: string;
  description: string;
}

export interface ResourceGroupView {
  category: string;
  items: ResourceItemView[];
}

export const CMS_COLLECTION_NAMES: CmsCollection[] = [
  "projects",
  "training",
  "faq",
  "company",
  "insights",
  "about",
  "homepage",
  "seo",
  "services",
  "partners",
  "contact",
  "resources",
  "training-page",
];

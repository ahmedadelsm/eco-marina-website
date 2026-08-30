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
  | "training-page"
  | "hero"
  | "pages"
  | "navigation"
  | "ui";

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
  casesViewAll: LocalizedText;
  casesViewCase: LocalizedText;
  founderEyebrow: LocalizedText;
  founderBiography: LocalizedText;
  founderExperienceTitle: LocalizedText;
  founderExperienceIntro: LocalizedText;
  insightsEyebrow: LocalizedText;
  insightsTitle: LocalizedText;
  insightsDescription: LocalizedText;
  insightsViewAll: LocalizedText;
  insightsReadArticle: LocalizedText;
  homeCtaTitle: LocalizedText;
  homeCtaButton: LocalizedText;
}

export interface CmsHero {
  eyebrow: LocalizedText;
  headline: LocalizedText;
  subheadline: LocalizedText;
  cta: LocalizedText;
  ctaSecondary: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
}

export interface CmsPageHero {
  eyebrow: LocalizedText;
  heading: LocalizedText;
  intro: LocalizedText;
  cta?: LocalizedText;
  imageAlt?: LocalizedText;
}

export interface CmsAboutPageCopy {
  eyebrow: LocalizedText;
  founderOf: LocalizedText;
  credentials: LocalizedText;
  careerTimeline: LocalizedText;
  areasOfWork: LocalizedText;
  countries: LocalizedText;
  ourValues: LocalizedText;
  linkedIn: LocalizedText;
}

export interface CmsMonitoringArea {
  id: string;
  name: LocalizedText;
  items: LocalizedList;
}

export interface CmsImpactAssessmentPage {
  serviceEyebrow: LocalizedText;
  cta: LocalizedText;
  overview: LocalizedText;
  steps: LocalizedList;
}

export interface CmsMonitoringPage {
  serviceEyebrow: LocalizedText;
  cta: LocalizedText;
  overview: LocalizedText;
  areas: CmsMonitoringArea[];
}

export interface CmsPages {
  projects: CmsPageHero;
  insights: CmsPageHero & { writtenBy: LocalizedText; founderNote: LocalizedText; discuss: LocalizedText };
  services: { eyebrow: LocalizedText; heading: LocalizedText };
  faq: { eyebrow: LocalizedText; heading: LocalizedText };
  about: CmsAboutPageCopy;
  impact: { heading: LocalizedText; body: LocalizedText; cta: LocalizedText };
  impactAssessment: CmsImpactAssessmentPage;
  monitoring: CmsMonitoringPage;
}

export interface CmsNavChild {
  id: string;
  label: LocalizedText;
  href: string;
}

export interface CmsNavItem {
  id: string;
  label: LocalizedText;
  href: string;
  children?: CmsNavChild[];
}

export interface CmsFooterItem {
  id: string;
  label: LocalizedText;
  href: string;
}

export interface CmsNavigation {
  header: CmsNavItem[];
  footer: CmsFooterItem[];
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
  eyebrow: LocalizedText;
  title: LocalizedText;
  pageIntro: LocalizedText;
  responseTime: LocalizedText;
  getInTouch: LocalizedText;
  emailLabel: LocalizedText;
  phoneLabel: LocalizedText;
  officeLabel: LocalizedText;
  serviceOptions: CmsContactServiceOption[];
}

export interface CmsUi {
  contact: LocalizedText;
  skipToContent: LocalizedText;
  openMenu: LocalizedText;
  closeMenu: LocalizedText;
  pagesLabel: LocalizedText;
  connect: LocalizedText;
  footerSince: LocalizedText;
  footerServices: LocalizedText;
  footerRegions: LocalizedText;
  projects: LocalizedText;
  countries: LocalizedText;
  since: LocalizedText;
  challenge: LocalizedText;
  approach: LocalizedText;
  outcomes: LocalizedText;
  projectDetails: LocalizedText;
  location: LocalizedText;
  client: LocalizedText;
  category: LocalizedText;
  servicesDelivered: LocalizedText;
  discussSimilar: LocalizedText;
  moreCaseStudies: LocalizedText;
  getInTouch: LocalizedText;
  topics: LocalizedText;
  audience: LocalizedText;
  groundedIn: LocalizedText;
  pricing: LocalizedText;
  schedule: LocalizedText;
  trainingCta: LocalizedText;
  requestTraining: LocalizedText;
  deliverables: LocalizedText;
  sectors: LocalizedText;
  detailsLink: LocalizedText;
  loading: LocalizedText;
  partners: LocalizedText;
  language: LocalizedText;
  formFirstName: LocalizedText;
  formLastName: LocalizedText;
  formEmail: LocalizedText;
  formOrganization: LocalizedText;
  formServiceInterest: LocalizedText;
  formSelectService: LocalizedText;
  formMessage: LocalizedText;
  formMessagePlaceholder: LocalizedText;
  formSend: LocalizedText;
  formSending: LocalizedText;
  formCaptcha: LocalizedText;
  formError: LocalizedText;
  formThankYou: LocalizedText;
  formReceived: LocalizedText;
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
  "partners",
  "contact",
  "resources",
  "training-page",
  "hero",
  "pages",
  "navigation",
  "ui",
]);

export function cmsStorageKey(collection: CmsCollection): string {
  return `cms.${collection}`;
}

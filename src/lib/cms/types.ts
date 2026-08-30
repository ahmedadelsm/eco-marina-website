export type CmsCollection = "projects" | "training" | "faq" | "company";

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

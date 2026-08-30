import type { Locale } from "@/lib/i18n";
import type {
  CmsCompany,
  CmsCoreService,
  CmsFaqSection,
  CmsInsight,
  CmsProject,
  CmsSeoEntry,
  CmsTrainingCourse,
  CoreServiceView,
  FaqSectionView,
  InsightView,
  LocalizedList,
  LocalizedText,
  ProjectView,
  TrainingCourseView,
} from "./types";

const SERVICE_ICONS: Record<string, CoreServiceView["icon"]> = {
  "impact-assessment": "assessment",
  monitoring: "monitoring",
  training: "training",
};

export function pickText(value: LocalizedText, locale: Locale): string {
  return value[locale]?.trim() || value.en;
}

export function pickList(value: LocalizedList, locale: Locale): string[] {
  const list = value[locale]?.length ? value[locale] : value.en;
  return list.filter(Boolean);
}

export function toProjectView(project: CmsProject, locale: Locale): ProjectView {
  return {
    slug: project.slug,
    title: pickText(project.title, locale),
    category: pickText(project.category, locale),
    summary: pickText(project.summary, locale),
    image: project.image,
    location: pickText(project.location, locale),
    client: pickText(project.client, locale),
    challenge: pickText(project.challenge, locale),
    approach: pickList(project.approach, locale),
    outcomes: pickList(project.outcomes, locale),
    services: pickList(project.services, locale),
  };
}

export function toTrainingView(course: CmsTrainingCourse, locale: Locale): TrainingCourseView {
  return {
    id: course.id,
    title: pickText(course.title, locale),
    duration: pickText(course.duration, locale),
    format: pickText(course.format, locale),
    description: pickText(course.description, locale),
    topics: pickList(course.topics, locale),
    audience: pickText(course.audience, locale),
    experience: pickText(course.experience, locale),
    pricing: pickText(course.pricing, locale),
    schedule: pickText(course.schedule, locale),
    image: course.image,
    imageAlt: pickText(course.imageAlt, locale),
  };
}

export function toFaqView(sections: CmsFaqSection[], locale: Locale): FaqSectionView[] {
  return sections.map((section) => ({
    category: pickText(section.category, locale),
    questions: section.questions.map((item) => ({
      q: pickText(item.q, locale),
      a: pickText(item.a, locale),
    })),
  }));
}

export function mergeCompany(defaults: CmsCompany, override: CmsCompany | null): CmsCompany {
  if (!override) return defaults;
  return {
    tagline: {
      en: override.tagline?.en?.trim() || defaults.tagline.en,
      nl: override.tagline?.nl?.trim() || defaults.tagline.nl,
    },
    motto: {
      en: override.motto?.en?.trim() || defaults.motto.en,
      nl: override.motto?.nl?.trim() || defaults.motto.nl,
    },
    linkedIn: override.linkedIn?.trim() || defaults.linkedIn,
    since: override.since ?? defaults.since,
    statsProjects: override.statsProjects ?? defaults.statsProjects,
    statsCountries: override.statsCountries ?? defaults.statsCountries,
  };
}

export function toInsightView(insight: CmsInsight, locale: Locale): InsightView {
  return {
    slug: insight.slug,
    title: pickText(insight.title, locale),
    excerpt: pickText(insight.excerpt, locale),
    category: pickText(insight.category, locale),
    readTime: pickText(insight.readTime, locale),
    date: pickText(insight.date, locale),
    datePublished: insight.datePublished,
    image: insight.image,
    sections: insight.sections.map((section) => ({
      heading: pickText(section.heading, locale),
      body: pickText(section.body, locale),
    })),
  };
}

export function toCoreServiceView(service: CmsCoreService, locale: Locale): CoreServiceView {
  return {
    slug: service.slug,
    title: pickText(service.title, locale),
    shortTitle: pickText(service.shortTitle, locale),
    tagline: pickText(service.tagline, locale),
    description: pickText(service.description, locale),
    href: service.href,
    icon: SERVICE_ICONS[service.slug] ?? "assessment",
    image: service.image,
    deliverables: pickList(service.deliverables, locale),
    sectors: pickList(service.sectors, locale),
  };
}

export function mergeRecord<T>(defaults: T, override: T | null): T {
  return override ?? defaults;
}

export function getSeoForPath(entries: CmsSeoEntry[], path: string, locale: Locale) {
  const entry = entries.find((item) => item.path === path);
  if (!entry) return null;
  return {
    title: pickText(entry.title, locale),
    description: pickText(entry.description, locale),
    image: entry.image,
  };
}

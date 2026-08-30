import type { Locale } from "@/lib/i18n";
import type {
  CmsCompany,
  CmsFaqSection,
  CmsProject,
  CmsTrainingCourse,
  FaqSectionView,
  LocalizedList,
  LocalizedText,
  ProjectView,
  TrainingCourseView,
} from "./types";

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

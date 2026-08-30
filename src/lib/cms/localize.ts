import type { Locale } from "@/lib/i18n";
import type {
  CmsCompany,
  CmsContactServiceOption,
  CmsCoreService,
  CmsFaqSection,
  CmsHero,
  CmsInsight,
  CmsLegacyService,
  CmsMonitoringArea,
  CmsNavigation,
  CmsNavItem,
  CmsPages,
  CmsPartner,
  CmsProcessStep,
  CmsProject,
  CmsResourceGroup,
  CmsSeoEntry,
  CmsServiceCategory,
  CmsTrainingCourse,
  CmsUi,
  CmsWhyUsCard,
  ContactServiceOptionView,
  CoreServiceView,
  FaqSectionView,
  InsightView,
  LegacyServiceView,
  AboutPageCopyView,
  FooterNavItemView,
  HeroView,
  LocalizedList,
  LocalizedText,
  MonitoringAreaView,
  NavItemView,
  PageHeroView,
  PartnerView,
  ProcessStepView,
  ProjectView,
  ResourceGroupView,
  ServiceCategoryView,
  TrainingCourseView,
  UiView,
  WhyUsCardView,
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
    name: {
      en: override.name?.en?.trim() || defaults.name.en,
      nl: override.name?.nl?.trim() || defaults.name.nl,
    },
    tagline: {
      en: override.tagline?.en?.trim() || defaults.tagline.en,
      nl: override.tagline?.nl?.trim() || defaults.tagline.nl,
    },
    motto: {
      en: override.motto?.en?.trim() || defaults.motto.en,
      nl: override.motto?.nl?.trim() || defaults.motto.nl,
    },
    email: override.email?.trim() || defaults.email,
    phone: override.phone?.trim() || defaults.phone,
    office: {
      en: override.office?.en?.trim() || defaults.office.en,
      nl: override.office?.nl?.trim() || defaults.office.nl,
    },
    domain: override.domain?.trim() || defaults.domain,
    linkedIn: override.linkedIn?.trim() || defaults.linkedIn,
    since: override.since ?? defaults.since,
    statsProjects: override.statsProjects ?? defaults.statsProjects,
    statsCountries: override.statsCountries ?? defaults.statsCountries,
    operatingRegions: {
      en: override.operatingRegions?.en?.length ? override.operatingRegions.en : defaults.operatingRegions.en,
      nl: override.operatingRegions?.nl?.length ? override.operatingRegions.nl : defaults.operatingRegions.nl,
    },
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

export function mergeCmsObject<T extends object>(defaults: T, override: Partial<T> | null | undefined): T {
  if (!override) return defaults;
  return { ...defaults, ...override };
}

export function toWhyUsView(cards: CmsWhyUsCard[], locale: Locale): WhyUsCardView[] {
  return cards.map((card) => ({
    title: pickText(card.title, locale),
    description: pickText(card.description, locale),
  }));
}

export function toProcessStepView(steps: CmsProcessStep[], locale: Locale): ProcessStepView[] {
  return steps.map((step) => ({
    step: pickText(step.step, locale),
    title: pickText(step.title, locale),
    description: pickText(step.description, locale),
  }));
}

export function toServiceCategoryView(categories: CmsServiceCategory[], locale: Locale): ServiceCategoryView[] {
  return categories.map((cat) => ({
    title: pickText(cat.title, locale),
    description: pickText(cat.description, locale),
    items: pickList(cat.items, locale),
    image: cat.image,
  }));
}

export function toLegacyServiceView(services: CmsLegacyService[], locale: Locale): LegacyServiceView[] {
  return services.map((service) => ({
    slug: service.slug,
    title: pickText(service.title, locale),
    description: pickText(service.description, locale),
    image: service.image,
    href: service.href,
  }));
}

export function toPartnerView(partners: CmsPartner[], locale: Locale): PartnerView[] {
  return partners
    .filter((partner) => partner.published)
    .map((partner) => ({
      id: partner.id,
      name: pickText(partner.name, locale),
      location: pickText(partner.location, locale),
      logo: partner.logo,
    }));
}

export function toContactServiceOptions(options: CmsContactServiceOption[], locale: Locale): ContactServiceOptionView[] {
  return options.map((option) => ({
    value: option.value,
    label: pickText(option.label, locale),
  }));
}

export function toResourceGroups(groups: CmsResourceGroup[], locale: Locale): ResourceGroupView[] {
  return groups.map((group) => ({
    category: pickText(group.category, locale),
    items: group.items.map((item) => ({
      title: pickText(item.title, locale),
      description: pickText(item.description, locale),
    })),
  }));
}

export function toHeroView(hero: CmsHero, locale: Locale): HeroView {
  return {
    eyebrow: pickText(hero.eyebrow, locale),
    headline: pickText(hero.headline, locale),
    subheadline: pickText(hero.subheadline, locale),
    cta: pickText(hero.cta, locale),
    ctaSecondary: pickText(hero.ctaSecondary, locale),
    image: hero.image,
    imageAlt: pickText(hero.imageAlt, locale),
  };
}

export function toPageHeroView(block: { eyebrow: LocalizedText; heading: LocalizedText; intro: LocalizedText; cta?: LocalizedText; image?: string; imageAlt?: LocalizedText }, locale: Locale): PageHeroView {
  return {
    eyebrow: pickText(block.eyebrow, locale),
    heading: pickText(block.heading, locale),
    intro: pickText(block.intro, locale),
    cta: block.cta ? pickText(block.cta, locale) : undefined,
    image: block.image,
    imageAlt: block.imageAlt ? pickText(block.imageAlt, locale) : undefined,
  };
}

export function toAboutPageCopy(copy: CmsPages["about"], locale: Locale): AboutPageCopyView {
  return {
    eyebrow: pickText(copy.eyebrow, locale),
    founderOf: pickText(copy.founderOf, locale),
    credentials: pickText(copy.credentials, locale),
    careerTimeline: pickText(copy.careerTimeline, locale),
    areasOfWork: pickText(copy.areasOfWork, locale),
    countries: pickText(copy.countries, locale),
    ourValues: pickText(copy.ourValues, locale),
    linkedIn: pickText(copy.linkedIn, locale),
  };
}

export function toMonitoringAreas(areas: CmsMonitoringArea[], locale: Locale): MonitoringAreaView[] {
  return areas.map((area) => ({
    name: pickText(area.name, locale),
    items: pickList(area.items, locale),
  }));
}

export function toNavItems(items: CmsNavItem[], locale: Locale): NavItemView[] {
  return items.map((item) => ({
    label: pickText(item.label, locale),
    href: item.href,
    children: item.children?.map((child) => ({
      label: pickText(child.label, locale),
      href: child.href,
    })),
  }));
}

export function toFooterNav(items: CmsNavigation["footer"], locale: Locale): FooterNavItemView[] {
  return items.map((item) => ({
    label: pickText(item.label, locale),
    href: item.href,
  }));
}

export function normalizeSeoPath(path: string): string {
  if (path === "/nl") return "/";
  if (path.startsWith("/nl/")) return path.slice(3);
  return path;
}

export function getSeoForPath(entries: CmsSeoEntry[], path: string, locale: Locale) {
  const entry = entries.find((item) => item.path === normalizeSeoPath(path));
  if (!entry) return null;
  return {
    title: pickText(entry.title, locale),
    description: pickText(entry.description, locale),
    image: entry.image,
  };
}

export function toUiView(ui: CmsUi, locale: Locale): UiView {
  return {
    contact: pickText(ui.contact, locale),
    skipToContent: pickText(ui.skipToContent, locale),
    openMenu: pickText(ui.openMenu, locale),
    closeMenu: pickText(ui.closeMenu, locale),
    pages: pickText(ui.pagesLabel, locale),
    connect: pickText(ui.connect, locale),
    footerSince: pickText(ui.footerSince, locale),
    footerServices: pickText(ui.footerServices, locale),
    footerRegions: pickText(ui.footerRegions, locale),
    projects: pickText(ui.projects, locale),
    countries: pickText(ui.countries, locale),
    since: pickText(ui.since, locale),
    challenge: pickText(ui.challenge, locale),
    approach: pickText(ui.approach, locale),
    outcomes: pickText(ui.outcomes, locale),
    projectDetails: pickText(ui.projectDetails, locale),
    location: pickText(ui.location, locale),
    client: pickText(ui.client, locale),
    category: pickText(ui.category, locale),
    servicesDelivered: pickText(ui.servicesDelivered, locale),
    discussSimilar: pickText(ui.discussSimilar, locale),
    moreCaseStudies: pickText(ui.moreCaseStudies, locale),
    getInTouch: pickText(ui.getInTouch, locale),
    topics: pickText(ui.topics, locale),
    audience: pickText(ui.audience, locale),
    groundedIn: pickText(ui.groundedIn, locale),
    pricing: pickText(ui.pricing, locale),
    schedule: pickText(ui.schedule, locale),
    trainingCta: pickText(ui.trainingCta, locale),
    requestTraining: pickText(ui.requestTraining, locale),
    deliverables: pickText(ui.deliverables, locale),
    sectors: pickText(ui.sectors, locale),
    detailsLink: pickText(ui.detailsLink, locale),
    loading: pickText(ui.loading, locale),
    partners: pickText(ui.partners, locale),
    language: pickText(ui.language, locale),
    form: {
      firstName: pickText(ui.formFirstName, locale),
      lastName: pickText(ui.formLastName, locale),
      email: pickText(ui.formEmail, locale),
      organization: pickText(ui.formOrganization, locale),
      serviceInterest: pickText(ui.formServiceInterest, locale),
      selectService: pickText(ui.formSelectService, locale),
      message: pickText(ui.formMessage, locale),
      messagePlaceholder: pickText(ui.formMessagePlaceholder, locale),
      send: pickText(ui.formSend, locale),
      sending: pickText(ui.formSending, locale),
      captcha: pickText(ui.formCaptcha, locale),
      error: pickText(ui.formError, locale),
      thankYou: pickText(ui.formThankYou, locale),
      received: pickText(ui.formReceived, locale),
    },
  };
}

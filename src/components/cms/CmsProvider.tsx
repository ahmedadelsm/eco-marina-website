"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale/LocaleProvider";
import {
  defaultCmsAbout,
  defaultCmsCompany,
  defaultCmsContact,
  defaultCmsFaq,
  defaultCmsHero,
  defaultCmsHomepage,
  defaultCmsInsights,
  defaultCmsNavigation,
  defaultCmsPages,
  defaultCmsPartners,
  defaultCmsProjects,
  defaultCmsResources,
  defaultCmsServices,
  defaultCmsTraining,
  defaultCmsTrainingPage,
  defaultCmsUi,
} from "@/lib/cms/defaults";
import {
  mergeCompany,
  mergeCmsObject,
  pickList,
  pickText,
  toAboutPageCopy,
  toContactServiceOptions,
  toCoreServiceView,
  toFaqView,
  toFooterNav,
  toHeroView,
  toInsightView,
  toLegacyServiceView,
  toMonitoringAreas,
  toNavItems,
  toPageHeroView,
  toPartnerView,
  toProcessStepView,
  toProjectView,
  toResourceGroups,
  toServiceCategoryView,
  toTrainingView,
  toUiView,
  toWhyUsView,
} from "@/lib/cms/localize";
import type {
  CmsAbout,
  CmsInsight,
  CmsPayload,
  CmsProject,
  AboutPageCopyView,
  ContactServiceOptionView,
  CoreServiceView,
  FaqSectionView,
  FooterNavItemView,
  HeroView,
  InsightView,
  LegacyServiceView,
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
} from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";
import { API, apiGet } from "@/lib/api";

type CmsContextValue = {
  ready: boolean;
  projects: ProjectView[];
  training: TrainingCourseView[];
  faq: FaqSectionView[];
  insights: InsightView[];
  coreServices: CoreServiceView[];
  specialistCategories: ServiceCategoryView[];
  legacyServices: LegacyServiceView[];
  whyUsCards: WhyUsCardView[];
  processSteps: ProcessStepView[];
  partners: PartnerView[];
  contactServiceOptions: ContactServiceOptionView[];
  resourceGroups: ResourceGroupView[];
  hero: HeroView;
  headerNav: NavItemView[];
  footerNav: FooterNavItemView[];
  ui: UiView;
  pageCopy: {
    projects: PageHeroView;
    insights: PageHeroView & { writtenBy: string; founderNote: string; discuss: string };
    services: { eyebrow: string; heading: string };
    faq: { eyebrow: string; heading: string };
    about: AboutPageCopyView;
    impactAssessment: { serviceEyebrow: string; cta: string; overview: string; steps: string[] };
    monitoring: { serviceEyebrow: string; cta: string; overview: string; areas: MonitoringAreaView[] };
  };
  servicesPage: {
    intro: string;
    coreTitle: string;
    specialistTitle: string;
    specialistIntro: string;
    legacyTitle: string;
    legacyIntro: string;
    cta: string;
  };
  homepage: {
    servicesEyebrow: string;
    servicesTitle: string;
    servicesDescription: string;
    missionEyebrow: string;
    missionTitle: string;
    missionValuesTitle: string;
    missionText: string;
    missionApproach: string;
    whyUsEyebrow: string;
    whyUsTitle: string;
    casesEyebrow: string;
    casesTitle: string;
    casesDescription: string;
    legacyEyebrow: string;
    legacyTitle: string;
    legacyDescription: string;
    processEyebrow: string;
    processTitle: string;
    casesViewAll: string;
    casesViewCase: string;
    founderEyebrow: string;
    founderBiography: string;
    founderExperienceTitle: string;
    founderExperienceIntro: string;
    insightsEyebrow: string;
    insightsTitle: string;
    insightsDescription: string;
    insightsViewAll: string;
    insightsReadArticle: string;
    homeCtaTitle: string;
    homeCtaButton: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    intro: string;
    responseTime: string;
    getInTouch: string;
    emailLabel: string;
    phoneLabel: string;
    officeLabel: string;
  };
  resourcesPage: {
    eyebrow: string;
    heading: string;
    intro: string;
    requestTitle: string;
    requestIntro: string;
  };
  trainingPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  about: CmsAbout & {
    nameText: string;
    titleText: string;
    imageAltText: string;
    bioShortText: string;
    bioLongText: string[];
    credentialsText: string[];
    focusText: string[];
    countriesText: string[];
    quoteText: string;
    quoteSourceText: string;
    missionText: string;
    approachText: string;
    valuesText: string[];
    timelineView: { period: string; label: string }[];
  };
  company: {
    name: string;
    tagline: string;
    motto: string;
    email: string;
    phone: string;
    office: string;
    domain: string;
    linkedIn: string;
    since: number;
    statsProjects: number;
    statsCountries: number;
    operatingRegions: string[];
  };
  getProject: (slug: string) => ProjectView | undefined;
  getInsight: (slug: string) => InsightView | undefined;
};

const EMPTY: CmsPayload = {
  projects: null,
  training: null,
  faq: null,
  company: null,
  insights: null,
  about: null,
  homepage: null,
  seo: null,
  services: null,
  partners: null,
  contact: null,
  resources: null,
  trainingPage: null,
  hero: null,
  pages: null,
  navigation: null,
  ui: null,
};

function publishedProjects(payload: CmsPayload): CmsProject[] {
  const source = payload.projects ?? defaultCmsProjects();
  return source.filter((p) => p.published);
}

function publishedInsights(payload: CmsPayload): CmsInsight[] {
  const source = payload.insights ?? defaultCmsInsights();
  return source.filter((i) => i.published);
}

function buildAbout(locale: Locale, payload: CmsPayload) {
  const about = mergeCmsObject(defaultCmsAbout(), payload.about);
  return {
    ...about,
    nameText: pickText(about.name, locale),
    titleText: pickText(about.title, locale),
    imageAltText: pickText(about.imageAlt, locale),
    bioShortText: pickText(about.bioShort, locale),
    bioLongText: pickList(about.bioLong, locale),
    credentialsText: pickList(about.credentials, locale),
    focusText: pickList(about.focus, locale),
    countriesText: pickList(about.countries, locale),
    quoteText: pickText(about.quote, locale),
    quoteSourceText: pickText(about.quoteSource, locale),
    missionText: pickText(about.mission, locale),
    approachText: pickText(about.approach, locale),
    valuesText: pickList(about.values, locale),
    timelineView: about.timeline.map((item) => ({
      period: pickText(item.period, locale),
      label: pickText(item.label, locale),
    })),
  };
}

function buildHomepage(locale: Locale, payload: CmsPayload) {
  const home = mergeCmsObject(defaultCmsHomepage(), payload.homepage);
  return {
    servicesEyebrow: pickText(home.servicesEyebrow, locale),
    servicesTitle: pickText(home.servicesTitle, locale),
    servicesDescription: pickText(home.servicesDescription, locale),
    missionEyebrow: pickText(home.missionEyebrow, locale),
    missionTitle: pickText(home.missionTitle, locale),
    missionValuesTitle: pickText(home.missionValuesTitle, locale),
    missionText: pickText(home.missionText, locale),
    missionApproach: pickText(home.missionApproach, locale),
    whyUsEyebrow: pickText(home.whyUsEyebrow, locale),
    whyUsTitle: pickText(home.whyUsTitle, locale),
    casesEyebrow: pickText(home.casesEyebrow, locale),
    casesTitle: pickText(home.casesTitle, locale),
    casesDescription: pickText(home.casesDescription, locale),
    legacyEyebrow: pickText(home.legacyEyebrow, locale),
    legacyTitle: pickText(home.legacyTitle, locale),
    legacyDescription: pickText(home.legacyDescription, locale),
    processEyebrow: pickText(home.processEyebrow, locale),
    processTitle: pickText(home.processTitle, locale),
    whyUsCards: toWhyUsView(home.whyUsCards, locale),
    processSteps: toProcessStepView(home.processSteps, locale),
    casesViewAll: pickText(home.casesViewAll, locale),
    casesViewCase: pickText(home.casesViewCase, locale),
    founderEyebrow: pickText(home.founderEyebrow, locale),
    founderBiography: pickText(home.founderBiography, locale),
    founderExperienceTitle: pickText(home.founderExperienceTitle, locale),
    founderExperienceIntro: pickText(home.founderExperienceIntro, locale),
    insightsEyebrow: pickText(home.insightsEyebrow, locale),
    insightsTitle: pickText(home.insightsTitle, locale),
    insightsDescription: pickText(home.insightsDescription, locale),
    insightsViewAll: pickText(home.insightsViewAll, locale),
    insightsReadArticle: pickText(home.insightsReadArticle, locale),
    homeCtaTitle: pickText(home.homeCtaTitle, locale),
    homeCtaButton: pickText(home.homeCtaButton, locale),
  };
}

function buildServicesPage(locale: Locale, payload: CmsPayload) {
  const services = mergeCmsObject(defaultCmsServices(), payload.services);
  return {
    intro: pickText(services.intro, locale),
    coreTitle: pickText(services.coreTitle, locale),
    specialistTitle: pickText(services.specialistTitle, locale),
    specialistIntro: pickText(services.specialistIntro, locale),
    legacyTitle: pickText(services.legacyTitle, locale),
    legacyIntro: pickText(services.legacyIntro, locale),
    cta: pickText(services.cta, locale),
    coreServices: services.coreServices.map((s) => toCoreServiceView(s, locale)),
    specialistCategories: toServiceCategoryView(services.specialistCategories, locale),
    legacyServices: toLegacyServiceView(services.legacyServices, locale),
  };
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();
  const [payload, setPayload] = useState<CmsPayload>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    apiGet<CmsPayload>(API.cms)
      .then((data) => setPayload(data))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const value = useMemo<CmsContextValue>(() => {
    const projects = publishedProjects(payload).map((p) => toProjectView(p, locale));
    const insights = publishedInsights(payload).map((i) => toInsightView(i, locale));
    const lookupProjects = payload.projects ?? defaultCmsProjects();
    const lookupInsights = payload.insights ?? defaultCmsInsights();
    const servicesData = buildServicesPage(locale, payload);
    const homepageData = buildHomepage(locale, payload);
    const contact = mergeCmsObject(defaultCmsContact(), payload.contact);
    const resources = mergeCmsObject(defaultCmsResources(), payload.resources);
    const trainingPage = mergeCmsObject(defaultCmsTrainingPage(), payload.trainingPage);
    const partners = toPartnerView(payload.partners ?? defaultCmsPartners(), locale);
    const heroData = toHeroView(mergeCmsObject(defaultCmsHero(), payload.hero), locale);
    const pagesData = mergeCmsObject(defaultCmsPages(), payload.pages);
    const navigationData = mergeCmsObject(defaultCmsNavigation(), payload.navigation);
    const uiData = toUiView(mergeCmsObject(defaultCmsUi(), payload.ui), locale);

    return {
      ready,
      projects,
      training: (payload.training ?? defaultCmsTraining())
        .filter((c) => c.published)
        .map((c) => toTrainingView(c, locale)),
      faq: toFaqView(payload.faq ?? defaultCmsFaq(), locale),
      insights,
      coreServices: servicesData.coreServices,
      specialistCategories: servicesData.specialistCategories,
      legacyServices: servicesData.legacyServices,
      whyUsCards: homepageData.whyUsCards,
      processSteps: homepageData.processSteps,
      partners,
      contactServiceOptions: toContactServiceOptions(contact.serviceOptions, locale),
      resourceGroups: toResourceGroups(resources.groups, locale),
      hero: heroData,
      headerNav: toNavItems(navigationData.header, locale),
      footerNav: toFooterNav(navigationData.footer, locale),
      ui: uiData,
      pageCopy: {
        projects: toPageHeroView(pagesData.projects, locale),
        insights: {
          ...toPageHeroView(pagesData.insights, locale),
          writtenBy: pickText(pagesData.insights.writtenBy, locale),
          founderNote: pickText(pagesData.insights.founderNote, locale),
          discuss: pickText(pagesData.insights.discuss, locale),
        },
        services: {
          eyebrow: pickText(pagesData.services.eyebrow, locale),
          heading: pickText(pagesData.services.heading, locale),
        },
        faq: {
          eyebrow: pickText(pagesData.faq.eyebrow, locale),
          heading: pickText(pagesData.faq.heading, locale),
        },
        about: toAboutPageCopy(pagesData.about, locale),
        impactAssessment: {
          serviceEyebrow: pickText(pagesData.impactAssessment.serviceEyebrow, locale),
          cta: pickText(pagesData.impactAssessment.cta, locale),
          overview: pickText(pagesData.impactAssessment.overview, locale),
          steps: pickList(pagesData.impactAssessment.steps, locale),
        },
        monitoring: {
          serviceEyebrow: pickText(pagesData.monitoring.serviceEyebrow, locale),
          cta: pickText(pagesData.monitoring.cta, locale),
          overview: pickText(pagesData.monitoring.overview, locale),
          areas: toMonitoringAreas(pagesData.monitoring.areas, locale),
        },
      },
      servicesPage: servicesData,
      homepage: homepageData,
      contactPage: {
        eyebrow: pickText(contact.eyebrow, locale),
        title: pickText(contact.title, locale),
        intro: pickText(contact.pageIntro, locale),
        responseTime: pickText(contact.responseTime, locale),
        getInTouch: pickText(contact.getInTouch, locale),
        emailLabel: pickText(contact.emailLabel, locale),
        phoneLabel: pickText(contact.phoneLabel, locale),
        officeLabel: pickText(contact.officeLabel, locale),
      },
      resourcesPage: {
        eyebrow: pickText(resources.eyebrow, locale),
        heading: pickText(resources.heading, locale),
        intro: pickText(resources.intro, locale),
        requestTitle: pickText(resources.requestTitle, locale),
        requestIntro: pickText(resources.requestIntro, locale),
      },
      trainingPage: {
        eyebrow: pickText(trainingPage.eyebrow, locale),
        title: pickText(trainingPage.title, locale),
        description: pickText(trainingPage.description, locale),
      },
      about: buildAbout(locale, payload),
      company: (() => {
        const merged = mergeCompany(defaultCmsCompany(), payload.company);
        return {
          name: pickText(merged.name, locale),
          tagline: pickText(merged.tagline, locale),
          motto: pickText(merged.motto, locale),
          email: merged.email,
          phone: merged.phone,
          office: pickText(merged.office, locale),
          domain: merged.domain,
          linkedIn: merged.linkedIn,
          since: merged.since,
          statsProjects: merged.statsProjects,
          statsCountries: merged.statsCountries,
          operatingRegions: pickList(merged.operatingRegions, locale),
        };
      })(),
      getProject: (slug: string) => {
        const item = lookupProjects.find((p) => p.slug === slug && p.published);
        return item ? toProjectView(item, locale) : undefined;
      },
      getInsight: (slug: string) => {
        const item = lookupInsights.find((i) => i.slug === slug && i.published);
        return item ? toInsightView(item, locale) : undefined;
      },
    };
  }, [locale, payload, ready]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used within CmsProvider");
  return ctx;
}

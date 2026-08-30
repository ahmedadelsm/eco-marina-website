"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale/LocaleProvider";
import {
  defaultCmsAbout,
  defaultCmsCompany,
  defaultCmsFaq,
  defaultCmsHomepage,
  defaultCmsInsights,
  defaultCmsProjects,
  defaultCmsSeo,
  defaultCmsServices,
  defaultCmsTraining,
} from "@/lib/cms/defaults";
import {
  getSeoForPath,
  mergeCompany,
  mergeRecord,
  pickList,
  pickText,
  toCoreServiceView,
  toFaqView,
  toInsightView,
  toProjectView,
  toTrainingView,
} from "@/lib/cms/localize";
import type {
  CmsAbout,
  CmsInsight,
  CmsPayload,
  CmsProject,
  CoreServiceView,
  FaqSectionView,
  InsightView,
  ProjectView,
  TrainingCourseView,
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
    tagline: string;
    motto: string;
    linkedIn: string;
    since: number;
    statsProjects: number;
    statsCountries: number;
  };
  getProject: (slug: string) => ProjectView | undefined;
  getInsight: (slug: string) => InsightView | undefined;
  getSeo: (path: string) => { title: string; description: string; image?: string } | null;
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
  const about = mergeRecord(defaultCmsAbout(), payload.about);
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
  const home = mergeRecord(defaultCmsHomepage(), payload.homepage);
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
  };
}

function buildServicesPage(locale: Locale, payload: CmsPayload) {
  const services = mergeRecord(defaultCmsServices(), payload.services);
  return {
    intro: pickText(services.intro, locale),
    coreTitle: pickText(services.coreTitle, locale),
    specialistTitle: pickText(services.specialistTitle, locale),
    specialistIntro: pickText(services.specialistIntro, locale),
    legacyTitle: pickText(services.legacyTitle, locale),
    legacyIntro: pickText(services.legacyIntro, locale),
    cta: pickText(services.cta, locale),
    coreServices: services.coreServices.map((s) => toCoreServiceView(s, locale)),
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
    const seoEntries = payload.seo ?? defaultCmsSeo();

    return {
      ready,
      projects,
      training: (payload.training ?? defaultCmsTraining())
        .filter((c) => c.published)
        .map((c) => toTrainingView(c, locale)),
      faq: toFaqView(payload.faq ?? defaultCmsFaq(), locale),
      insights,
      coreServices: servicesData.coreServices,
      servicesPage: servicesData,
      homepage: buildHomepage(locale, payload),
      about: buildAbout(locale, payload),
      company: (() => {
        const merged = mergeCompany(defaultCmsCompany(), payload.company);
        return {
          tagline: pickText(merged.tagline, locale),
          motto: pickText(merged.motto, locale),
          linkedIn: merged.linkedIn,
          since: merged.since,
          statsProjects: merged.statsProjects,
          statsCountries: merged.statsCountries,
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
      getSeo: (path: string) => getSeoForPath(seoEntries, path, locale),
    };
  }, [locale, payload, ready]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used within CmsProvider");
  return ctx;
}

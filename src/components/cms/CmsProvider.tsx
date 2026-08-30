"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale/LocaleProvider";
import { defaultCmsCompany, defaultCmsFaq, defaultCmsProjects, defaultCmsTraining } from "@/lib/cms/defaults";
import { mergeCompany, pickText, toFaqView, toProjectView, toTrainingView } from "@/lib/cms/localize";
import type { CmsPayload, CmsProject, FaqSectionView, ProjectView, TrainingCourseView } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";
import { API, apiGet } from "@/lib/api";

type CmsContextValue = {
  ready: boolean;
  projects: ProjectView[];
  training: TrainingCourseView[];
  faq: FaqSectionView[];
  company: {
    tagline: string;
    motto: string;
    linkedIn: string;
    since: number;
    statsProjects: number;
    statsCountries: number;
  };
  getProject: (slug: string) => ProjectView | undefined;
};

const CmsContext = createContext<CmsContextValue | null>(null);

const EMPTY: CmsPayload = {
  projects: null,
  training: null,
  faq: null,
  company: null,
};

function buildProjects(locale: Locale, payload: CmsPayload): ProjectView[] {
  const source = payload.projects ?? defaultCmsProjects();
  return source.filter((p) => p.published).map((p) => toProjectView(p, locale));
}

function buildTraining(locale: Locale, payload: CmsPayload): TrainingCourseView[] {
  const source = payload.training ?? defaultCmsTraining();
  return source.filter((c) => c.published).map((c) => toTrainingView(c, locale));
}

function buildFaq(locale: Locale, payload: CmsPayload): FaqSectionView[] {
  const source = payload.faq ?? defaultCmsFaq();
  return toFaqView(source, locale);
}

function buildCompany(locale: Locale, payload: CmsPayload) {
  const merged = mergeCompany(defaultCmsCompany(), payload.company);
  return {
    tagline: pickText(merged.tagline, locale),
    motto: pickText(merged.motto, locale),
    linkedIn: merged.linkedIn,
    since: merged.since,
    statsProjects: merged.statsProjects,
    statsCountries: merged.statsCountries,
  };
}

function allProjects(payload: CmsPayload): CmsProject[] {
  return payload.projects ?? defaultCmsProjects();
}

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
    const lookup = allProjects(payload);
    return {
      ready,
      projects: buildProjects(locale, payload),
      training: buildTraining(locale, payload),
      faq: buildFaq(locale, payload),
      company: buildCompany(locale, payload),
      getProject: (slug: string) => {
        const item = lookup.find((p) => p.slug === slug && p.published);
        return item ? toProjectView(item, locale) : undefined;
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

"use client";

import { createContext, useContext, useMemo } from "react";
import { getContent, type SiteContentModule } from "@/content/index";
import { alternateLocale, localePath, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  content: SiteContentModule;
  path: (href: string) => string;
  alternateLocale: Locale;
  alternatePath: (currentPath: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(() => {
    const content = getContent(locale);
    const other = alternateLocale(locale);
    return {
      locale,
      content,
      path: (href: string) => localePath(locale, href),
      alternateLocale: other,
      alternatePath: (currentPath: string) => localePath(other, currentPath),
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useSiteContent() {
  return useLocale().content;
}

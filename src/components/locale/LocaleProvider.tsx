"use client";

import { createContext, useContext, useMemo } from "react";
import { alternateLocale, localePath, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
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
    const other = alternateLocale(locale);
    return {
      locale,
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

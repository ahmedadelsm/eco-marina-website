export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
};

/** Prefix a path with /nl when locale is Dutch; English stays at root. */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "nl") {
    return normalized === "/" ? "/nl" : `/nl${normalized}`;
  }
  return normalized;
}

/** Strip /nl prefix and return locale + base path. */
export function parseLocalePath(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const base = pathname === "/nl" ? "/" : pathname.slice(3) || "/";
    return { locale: "nl", path: base };
  }
  return { locale: "en", path: pathname || "/" };
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "nl" : "en";
}

export function openGraphLocale(locale: Locale): string {
  return locale === "nl" ? "nl_NL" : "en_GB";
}

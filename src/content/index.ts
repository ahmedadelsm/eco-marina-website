import type { Locale } from "@/lib/i18n";
import * as en from "./en/site-content";
import * as nl from "./nl/site-content";

const contentByLocale = { en, nl } as const;

export type SiteContentModule = typeof en;

export function getContent(locale: Locale): SiteContentModule {
  return contentByLocale[locale] as SiteContentModule;
}

// Re-export English as default for admin and legacy imports
export * from "./en/site-content";

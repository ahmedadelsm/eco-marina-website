"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { localeLabels, parseLocalePath } from "@/lib/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const { locale, alternatePath } = useLocale();
  const { path: basePath } = parseLocalePath(pathname);
  const otherLocale = locale === "en" ? "nl" : "en";
  const enHref = locale === "en" ? pathname : alternatePath(basePath);
  const nlHref = locale === "nl" ? pathname : alternatePath(basePath);

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <span className="sr-only">Language</span>
      <Link
        href={enHref}
        className={locale === "en" ? "text-ink" : "text-ink-light hover:text-ink"}
        aria-current={locale === "en" ? "true" : undefined}
        hrefLang="en"
      >
        EN
      </Link>
      <span className="text-ink-light" aria-hidden>
        |
      </span>
      <Link
        href={nlHref}
        className={locale === "nl" ? "text-ink" : "text-ink-light hover:text-ink"}
        aria-current={locale === "nl" ? "true" : undefined}
        hrefLang="nl"
        title={localeLabels[otherLocale]}
      >
        NL
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useSiteContent } from "./LocaleProvider";
import { localeLabels, parseLocalePath } from "@/lib/i18n";
import { setLocaleCookie } from "@/lib/locale-cookie";

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const { locale, alternatePath } = useLocale();
  const { ui } = useSiteContent();
  const { path: basePath } = parseLocalePath(pathname);
  const otherLocale = locale === "en" ? "nl" : "en";
  const enHref = locale === "en" ? pathname : alternatePath(basePath);
  const nlHref = locale === "nl" ? pathname : alternatePath(basePath);

  const linkClass = (active: boolean) =>
    [
      "inline-flex min-h-9 min-w-9 items-center justify-center rounded px-2 text-sm font-semibold tracking-wide transition-colors",
      active ? "bg-paper text-ink" : "text-ink-muted hover:bg-paper hover:text-ink",
    ].join(" ");

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label={ui.language}>
      <Link
        href={enHref}
        onClick={() => setLocaleCookie("en")}
        className={linkClass(locale === "en")}
        aria-current={locale === "en" ? "true" : undefined}
        hrefLang="en"
      >
        EN
      </Link>
      <span className="px-0.5 text-sm text-ink-light" aria-hidden>
        /
      </span>
      <Link
        href={nlHref}
        onClick={() => setLocaleCookie("nl")}
        className={linkClass(locale === "nl")}
        aria-current={locale === "nl" ? "true" : undefined}
        hrefLang="nl"
        title={localeLabels[otherLocale]}
      >
        NL
      </Link>
    </div>
  );
}

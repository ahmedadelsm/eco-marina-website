"use client";

import { AdminPreviewBar } from "@/components/admin/AdminPreviewBar";
import { CmsProvider } from "@/components/cms/CmsProvider";
import { CmsJsonLd } from "@/components/cms/CmsJsonLd";
import { SkipToContentLink } from "@/components/SkipToContentLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/components/locale/LocaleProvider";
import { SetHtmlLang } from "@/components/locale/SetHtmlLang";
import type { Locale } from "@/lib/i18n";

export function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      {locale === "nl" ? <SetHtmlLang locale="nl" /> : null}
      <CmsProvider>
        <CmsJsonLd />
        <SkipToContentLink />
        <div className="flex min-h-screen flex-col">
          <AdminPreviewBar />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </CmsProvider>
    </LocaleProvider>
  );
}

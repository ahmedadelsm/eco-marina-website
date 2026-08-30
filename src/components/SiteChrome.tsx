"use client";

import { AdminPreviewBar } from "@/components/admin/AdminPreviewBar";
import { CmsProvider } from "@/components/cms/CmsProvider";
import { ContentOverridesProvider } from "@/components/ContentOverridesProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/locale/LocaleProvider";
import { SetHtmlLang } from "@/components/locale/SetHtmlLang";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { organizationJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/structured-data";

export function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const { ui } = getContent(locale);

  return (
    <LocaleProvider locale={locale}>
      {locale === "nl" ? <SetHtmlLang locale="nl" /> : null}
      <ContentOverridesProvider>
        <CmsProvider>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), professionalServiceJsonLd()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          {ui.skipToContent}
        </a>
        <div className="flex min-h-screen flex-col">
          <AdminPreviewBar />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        </CmsProvider>
      </ContentOverridesProvider>
    </LocaleProvider>
  );
}

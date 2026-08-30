"use client";

import { AdminPreviewBar } from "@/components/admin/AdminPreviewBar";
import { CmsProvider } from "@/components/cms/CmsProvider";
import { SkipToContentLink } from "@/components/SkipToContentLink";
import { StructuredDataFromCms } from "@/components/cms/StructuredDataFromCms";
import { ContentOverridesProvider } from "@/components/ContentOverridesProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/locale/LocaleProvider";
import { SetHtmlLang } from "@/components/locale/SetHtmlLang";
import type { Locale } from "@/lib/i18n";
import { organizationJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/structured-data";

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
      <ContentOverridesProvider>
        <CmsProvider>
          <StructuredDataFromCms />
          <JsonLd data={[organizationJsonLd(), websiteJsonLd(), professionalServiceJsonLd()]} />
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
      </ContentOverridesProvider>
    </LocaleProvider>
  );
}

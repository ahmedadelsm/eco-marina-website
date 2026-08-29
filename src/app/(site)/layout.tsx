import type { Metadata } from "next";
import { AdminPreviewBar } from "@/components/admin/AdminPreviewBar";
import { ContentOverridesProvider } from "@/components/ContentOverridesProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://eco-marina.com"),
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <ContentOverridesProvider>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), professionalServiceJsonLd()]} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <AdminPreviewBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ContentOverridesProvider>
  );
}

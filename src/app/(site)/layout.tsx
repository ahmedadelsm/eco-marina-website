import type { Metadata } from "next";
import { AdminPreviewBar } from "@/components/admin/AdminPreviewBar";
import { ContentOverridesProvider } from "@/components/ContentOverridesProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: `${site.name} | ${site.tagline}`,
  description:
    "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.",
  path: "/",
});

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <ContentOverridesProvider>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <div className="flex min-h-screen flex-col">
        <AdminPreviewBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ContentOverridesProvider>
  );
}

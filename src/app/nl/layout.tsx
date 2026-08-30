import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { getBuildCompany } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";

const company = getBuildCompany("nl");

export const metadata: Metadata = buildPageMetadata({
  locale: "nl",
  title: company.name,
  description:
    "Milieu- en sociale effectbeoordeling, monitoringprogramma's en training. Gevestigd in Utrecht, Nederland.",
  path: "/nl",
});

export default function DutchSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="nl">{children}</SiteChrome>;
}

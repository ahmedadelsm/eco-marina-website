import type { Metadata } from "next";
import { getContent } from "@/content";
import { SiteChrome } from "@/components/SiteChrome";
import { buildPageMetadata } from "@/lib/seo";

const { site } = getContent("nl");

export const metadata: Metadata = buildPageMetadata({
  locale: "nl",
  title: site.name,
  description:
    "Milieu- en sociale effectbeoordeling, monitoringprogramma's en training. Gevestigd in Utrecht, Nederland.",
  path: "/nl",
});

export default function DutchSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="nl">{children}</SiteChrome>;
}

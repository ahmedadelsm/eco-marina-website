import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site-content";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

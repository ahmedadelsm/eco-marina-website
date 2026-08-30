import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://eco-marina.com"),
  title: {
    default: "Eco Marina | Environmental Consultancy",
    template: "%s | Eco Marina",
  },
  description:
    "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteChrome locale="en">{children}</SiteChrome>;
}

import { getBuildSeo } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageContent } from "@/components/ContactForm";

const seo = getBuildSeo("/nl/contact", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: seo?.title,
  description: seo?.description,
  path: "/nl/contact",
});

export default function Page() {
  return <ContactPageContent />;
}

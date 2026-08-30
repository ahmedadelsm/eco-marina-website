import { getBuildListPageMeta } from "@/lib/build-cms";
import { buildPageMetadata } from "@/lib/seo";
import { FAQContent } from "@/app/(site)/faq/FAQContent";

const meta = getBuildListPageMeta("faq", "nl");

export const metadata = buildPageMetadata({
  locale: "nl",
  title: meta?.title,
  description: meta?.description,
  path: "/nl/faq",
});

export default function Page() {
  return <FAQContent />;
}

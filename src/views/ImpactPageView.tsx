import Link from "next/link";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ImpactPageView({ locale }: { locale: Locale }) {
  const { pages } = getContent(locale);
  const path = (href: string) => localePath(locale, href);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{pages.impact.heading}</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink-muted">{pages.impact.body}</p>
      <Link href={path("/projects")} className="mt-8 inline-block text-sm font-medium text-sea hover:underline">
        {pages.impact.cta}
      </Link>
    </section>
  );
}

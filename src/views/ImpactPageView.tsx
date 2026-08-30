"use client";

import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";
import { localePath, type Locale } from "@/lib/i18n";

export function ImpactPageView({ locale }: { locale: Locale }) {
  const { pageCopy } = useCms();
  const path = (href: string) => localePath(locale, href);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{pageCopy.impact.heading}</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink-muted">{pageCopy.impact.body}</p>
      <Link href={path("/projects")} className="mt-8 inline-block text-sm font-medium text-sea hover:underline">
        {pageCopy.impact.cta}
      </Link>
    </section>
  );
}

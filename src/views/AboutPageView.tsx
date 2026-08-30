"use client";

import Image from "next/image";
import { ButtonArrow } from "@/components/Button";
import { PartnersSection } from "@/components/PartnersSection";
import { PageHero } from "@/components/PageHero";
import { useCms } from "@/components/cms/CmsProvider";
import { PageSeo } from "@/components/cms/PageSeo";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function AboutPageView({ locale }: { locale: Locale }) {
  const { site, pages, ui } = getContent(locale);
  const { about, company, pageCopy } = useCms();
  const path = (href: string) => localePath(locale, href);
  const seoPath = locale === "nl" ? "/nl/about" : "/about";
  const copy = pageCopy.about;

  return (
    <>
      <PageSeo path={seoPath} fallbackTitle={pages.about.title} fallbackDescription={pages.about.description} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={about.nameText}
        description={`${about.titleText} · ${copy.founderOf} ${site.name}`}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr]">
            <div className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden border border-line bg-paper">
                <Image
                  src={about.image}
                  alt={about.imageAltText}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm text-ink-muted lg:text-left">{about.titleText}</p>
            </div>
            <div>
              <p className="mt-6 text-xl leading-relaxed text-ink">{about.bioShortText}</p>
              <div className="mt-8 space-y-4 text-ink-muted">
                {about.bioLongText.map((p) => (
                  <p key={p.slice(0, 50)}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <blockquote className="mt-12 border-l-4 border-sea bg-paper py-4 pl-6 pr-4">
            <p className="font-serif text-lg italic text-ink">&ldquo;{about.quoteText}&rdquo;</p>
            <footer className="mt-2 text-xs text-ink-light">— {about.quoteSourceText}</footer>
          </blockquote>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">{copy.credentials}</h2>
              <ul className="mt-6 grid gap-3">
                {about.credentialsText.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">{copy.careerTimeline}</h2>
              <ol className="relative mt-10 border-l border-line pl-8">
                {about.timelineView.map((item) => (
                  <li key={item.label} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-sea" />
                    <span className="text-sm font-semibold text-sea">{item.period}</span>
                    <p className="mt-1 text-ink-muted">{item.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">{copy.areasOfWork}</h2>
              <ul className="mt-6 space-y-3">
                {about.focusText.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">{copy.countries}</h2>
              <p className="mt-4 text-ink-muted">{about.countriesText.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">{site.name}</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-sea">{company.motto}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{about.missionText}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{about.approachText}</p>
          <h3 className="mt-8 font-serif text-lg font-semibold text-ink">{copy.ourValues}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {about.valuesText.map((value) => (
              <li key={value} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="text-sea">—</span> {value}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonArrow href={path("/contact")}>{ui.getInTouch}</ButtonArrow>
            <a
              href={company.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-sea hover:underline"
            >
              {copy.linkedIn}
            </a>
          </div>
        </div>
      </section>

      <PartnersSection />
    </>
  );
}

"use client";

import Image from "next/image";
import { Button, ButtonArrow } from "@/components/Button";
import { useContentOverride } from "@/components/ContentOverridesProvider";
import { useCms } from "@/components/cms/CmsProvider";
import { useLocale, useSiteContent } from "@/components/locale/LocaleProvider";
import { CMS_KEYS } from "@/lib/content-keys";

export function HomeHero() {
  const { path, locale } = useLocale();
  const { hero, ui } = useSiteContent();
  const { company } = useCms();
  const headlineKey = locale === "nl" ? CMS_KEYS.heroHeadlineNl : CMS_KEYS.heroHeadline;
  const subheadlineKey = locale === "nl" ? CMS_KEYS.heroSubheadlineNl : CMS_KEYS.heroSubheadline;
  const headline = useContentOverride(headlineKey, hero.headline);
  const subheadline = useContentOverride(subheadlineKey, hero.subheadline);

  return (
    <section className="relative min-h-[min(100svh,880px)] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          className="photo-image object-cover object-[center_35%] opacity-40 sm:object-center sm:opacity-45"
          priority
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden />
        <div className="hero-overlay-mobile absolute inset-0 sm:hidden" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:min-h-[min(88vh,820px)] lg:justify-center lg:py-32">
        <div className="hero-copy max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">{hero.eyebrow}</p>
          <p className="mt-3 max-w-xl text-sm font-medium tracking-wide text-white/85">{company.motto}</p>
          <h1 className="hero-title mt-5 font-serif text-[1.75rem] font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
            {subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonArrow href={path("/contact")} size="lg" className="w-full sm:w-auto">
              {hero.cta}
            </ButtonArrow>
            <Button href={path("/projects")} variant="outline-light" size="lg" className="w-full sm:w-auto">
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-white/20 pt-8 sm:mt-14 sm:max-w-md sm:gap-6">
          <div>
            <dt className="font-serif text-xl font-semibold text-white sm:text-2xl">{company.statsProjects}+</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-[11px]">{ui.projects}</dd>
          </div>
          <div>
            <dt className="font-serif text-xl font-semibold text-white sm:text-2xl">{company.statsCountries}</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-[11px]">{ui.countries}</dd>
          </div>
          <div>
            <dt className="font-serif text-xl font-semibold text-white sm:text-2xl">{company.since}</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-[11px]">{ui.since}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function HomeCta() {
  const { path } = useLocale();
  const { site, ui } = useSiteContent();
  const email = useContentOverride(CMS_KEYS.siteEmail, site.email);
  const phone = useContentOverride(CMS_KEYS.sitePhone, site.phone);
  const office = useContentOverride(CMS_KEYS.siteOffice, site.office);

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{ui.bookConsultation}</h2>
        <div className="mx-auto mt-4 flex max-w-lg flex-col gap-1 text-sm text-ink-muted sm:text-base">
          <a href={`mailto:${email}`} className="hover:text-sea">
            {email}
          </a>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-sea">
            {phone}
          </a>
          <span>{office}</span>
        </div>
        <ButtonArrow href={path("/contact")} className="mt-8 w-full sm:w-auto">
          {ui.contactUs}
        </ButtonArrow>
      </div>
    </section>
  );
}

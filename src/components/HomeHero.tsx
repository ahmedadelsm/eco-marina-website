"use client";

import Image from "next/image";
import { Button, ButtonArrow } from "@/components/Button";
import { useContentOverride } from "@/components/ContentOverridesProvider";
import { CMS_KEYS } from "@/lib/content-keys";
import { hero, site } from "@/content/site-content";

export function HomeHero() {
  const headline = useContentOverride(CMS_KEYS.heroHeadline, hero.headline);
  const subheadline = useContentOverride(CMS_KEYS.heroSubheadline, hero.subheadline);

  return (
    <section className="relative min-h-[min(88vh,820px)] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          className="photo-image object-cover object-center opacity-55"
          priority
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">{hero.eyebrow}</p>
        <p className="mt-3 max-w-xl text-sm font-medium tracking-wide text-white/70">{site.motto}</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-[2.75rem] lg:text-5xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">{subheadline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonArrow href="/contact" size="lg">
            {hero.cta}
          </ButtonArrow>
          <Button href="/projects" variant="outline-light" size="lg">
            {hero.ctaSecondary}
          </Button>
        </div>
        <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 sm:max-w-md">
          <div>
            <dt className="font-serif text-2xl font-semibold text-white">{site.stats.projects}+</dt>
            <dd className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Projects</dd>
          </div>
          <div>
            <dt className="font-serif text-2xl font-semibold text-white">{site.stats.countries}</dt>
            <dd className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Countries</dd>
          </div>
          <div>
            <dt className="font-serif text-2xl font-semibold text-white">{site.since}</dt>
            <dd className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Since</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function HomeCta() {
  const email = useContentOverride(CMS_KEYS.siteEmail, site.email);
  const phone = useContentOverride(CMS_KEYS.sitePhone, site.phone);
  const office = useContentOverride(CMS_KEYS.siteOffice, site.office);

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-ink">Book your consultation appointment</h2>
        <p className="mx-auto mt-4 max-w-lg text-ink-muted">
          {email} · {phone} · {office}
        </p>
        <ButtonArrow href="/contact" className="mt-8">
          Contact us
        </ButtonArrow>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonArrow } from "@/components/Button";
import { CoreServiceCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { useCms } from "@/components/cms/CmsProvider";
import { PageSeo } from "@/components/cms/PageSeo";
import { localePath, type Locale } from "@/lib/i18n";

export function ServicesPageView({ locale }: { locale: Locale }) {
  const { coreServices, servicesPage, specialistCategories, legacyServices, pageCopy } = useCms();
  const path = (href: string) => localePath(locale, href);
  const seoPath = locale === "nl" ? "/nl/services" : "/services";

  return (
    <>
      <PageSeo path={seoPath} fallbackTitle={pageCopy.services.heading} fallbackDescription={servicesPage.intro} />
      <PageHero eyebrow={pageCopy.services.eyebrow} title={pageCopy.services.heading} description={servicesPage.intro} />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">{servicesPage.coreTitle}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {coreServices.map((s) => (
              <CoreServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">{servicesPage.specialistTitle}</h2>
          <p className="mt-2 max-w-2xl text-ink-muted">{servicesPage.specialistIntro}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {specialistCategories.map((cat) => (
              <div key={cat.title} className="border border-line bg-white">
                <div className="relative aspect-[16/7] overflow-hidden bg-paper">
                  <Image src={cat.image} alt={cat.title} fill className="photo-image object-cover" sizes="50vw" />
                  <div className="photo-tint absolute inset-0" aria-hidden />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink">{cat.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{cat.description}</p>
                  <ul className="mt-4 space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-ink-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sea" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">{servicesPage.legacyTitle}</h2>
          <p className="mt-2 max-w-2xl text-ink-muted">{servicesPage.legacyIntro}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {legacyServices.map((service) => (
              <Link key={service.slug} href={path(service.href)} className="group flex gap-5 border border-line bg-white p-4">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-paper">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="128px" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-ink group-hover:text-sea">{service.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <ButtonArrow href={path("/contact")}>{servicesPage.cta}</ButtonArrow>
      </section>
    </>
  );
}

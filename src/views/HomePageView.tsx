"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CoreServiceCard, InsightCard, ProjectCard } from "@/components/CoreServiceCard";
import { useCms } from "@/components/cms/CmsProvider";
import { PageSeo } from "@/components/cms/PageSeo";
import { HomeCta, HomeHero } from "@/components/HomeHero";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function HomePageView({ locale }: { locale: Locale }) {
  const { homePage, site } = getContent(locale);
  const { projects, homepage, coreServices, insights, about, whyUsCards, legacyServices, processSteps } = useCms();
  const path = (href: string) => localePath(locale, href);
  const seoPath = locale === "nl" ? "/nl" : "/";

  return (
    <>
      <PageSeo
        path={seoPath}
        fallbackTitle={`${site.name} — ${site.tagline}`}
        fallbackDescription={homePage.services.description}
      />
      <HomeHero />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={homepage.servicesEyebrow}
            title={homepage.servicesTitle}
            description={homepage.servicesDescription}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {coreServices.map((service) => (
              <CoreServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="brand-accent-heading">
                <SectionHeading eyebrow={homepage.missionEyebrow} title={homepage.missionTitle} />
              </div>
              <p className="mt-6 leading-relaxed text-ink-muted">{homepage.missionText}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{homepage.missionApproach}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-ink">{homepage.missionValuesTitle}</h3>
              <ul className="mt-6 space-y-3">
                {about.valuesText.map((value) => (
                  <li key={value} className="flex items-start gap-3 border-l-2 border-brand-green pl-4 text-ink-muted">
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={homepage.whyUsEyebrow} title={homepage.whyUsTitle} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {whyUsCards.map((item) => (
              <div key={item.title} className="border-l-2 border-brand-blue pl-6">
                <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={homepage.casesEyebrow}
              title={homepage.casesTitle}
              description={homepage.casesDescription}
            />
            <Link href={path("/projects")} className="text-sm font-medium text-sea hover:underline">
              {homePage.cases.viewAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} viewLabel={homePage.cases.viewCase} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[240px_1fr]">
            <div className="mx-auto w-full max-w-[240px] shrink-0 lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden border border-white/15">
                <Image
                  src={about.image}
                  alt={about.imageAltText}
                  fill
                  className="object-cover object-top"
                  sizes="240px"
                />
              </div>
            </div>
            <div>
              <SectionHeading eyebrow={homePage.founder.eyebrow} title={about.nameText} light />
              <p className="mt-2 text-sm text-sea-light">{about.titleText}</p>
              <p className="mt-6 text-lg text-white/85">{about.bioShortText}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{about.bioLongText[0]}</p>
              <blockquote className="mt-6 border-l-2 border-sea-light pl-4">
                <p className="font-serif italic text-white/80">&ldquo;{about.quoteText}&rdquo;</p>
              </blockquote>
              <Button href={path("/about")} variant="outline-light" size="sm" className="mt-8">
                {homePage.founder.biography}
              </Button>
            </div>
          </div>
          <div className="mt-12 border border-white/10 bg-white/5 p-8 lg:ml-[calc(240px+3rem)]">
            <h3 className="font-serif text-lg font-semibold">{homePage.founder.experienceTitle}</h3>
            <p className="mt-4 text-sm text-white/70">
              {homePage.founder.experienceIntro} {about.countriesText.join(", ")}.
            </p>
            <ul className="mt-6 space-y-2">
              {about.focusText.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="text-sea-light">—</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={homePage.insights.eyebrow}
              title={homePage.insights.title}
              description={homePage.insights.description}
            />
            <Link href={path("/insights")} className="text-sm font-medium text-sea hover:underline">
              {homePage.insights.viewAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {insights.map((article) => (
              <InsightCard key={article.slug} article={article} readLabel={homePage.insights.readArticle} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={homepage.legacyEyebrow}
            title={homepage.legacyTitle}
            description={homepage.legacyDescription}
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {legacyServices.map((service) => (
              <Link key={service.slug} href={path(service.href)} className="group border border-line bg-white">
                <div className="relative aspect-[3/2] overflow-hidden bg-paper">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="25vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-ink group-hover:text-sea">{service.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted line-clamp-3">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={homepage.processEyebrow} title={homepage.processTitle} centered />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="border border-line bg-white p-6">
                <span className="font-serif text-2xl text-sea/40">{step.step}</span>
                <h3 className="mt-2 font-serif font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HomeCta />
    </>
  );
}

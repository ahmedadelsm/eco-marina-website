"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CoreServiceCard, InsightCard, ProjectCard } from "@/components/CoreServiceCard";
import { useCms } from "@/components/cms/CmsProvider";
import { HomeCta, HomeHero } from "@/components/HomeHero";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function HomePageView({ locale }: { locale: Locale }) {
  const { homePage, coreServices, mission, site, whyUs, adelRegal, insights, legacyServices, processSteps } =
    getContent(locale);
  const { projects } = useCms();
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <HomeHero />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={homePage.services.eyebrow}
            title={homePage.services.title}
            description={homePage.services.description}
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
                <SectionHeading eyebrow={homePage.mission.eyebrow} title={homePage.mission.title} />
              </div>
              <p className="mt-6 leading-relaxed text-ink-muted">{mission.mission}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{mission.approach}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-ink">{homePage.mission.valuesTitle}</h3>
              <ul className="mt-6 space-y-3">
                {site.values.map((value) => (
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
          <SectionHeading eyebrow={homePage.whyUs.eyebrow} title={homePage.whyUs.title} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {whyUs.map((item) => (
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
              eyebrow={homePage.cases.eyebrow}
              title={homePage.cases.title}
              description={homePage.cases.description}
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
                  src={adelRegal.image}
                  alt={adelRegal.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="240px"
                />
              </div>
            </div>
            <div>
              <SectionHeading eyebrow={homePage.founder.eyebrow} title={adelRegal.name} light />
              <p className="mt-2 text-sm text-sea-light">{adelRegal.title}</p>
              <p className="mt-6 text-lg text-white/85">{adelRegal.bioShort}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{adelRegal.bioLong[0]}</p>
              <blockquote className="mt-6 border-l-2 border-sea-light pl-4">
                <p className="font-serif italic text-white/80">&ldquo;{adelRegal.quote}&rdquo;</p>
              </blockquote>
              <Button href={path("/about")} variant="outline-light" size="sm" className="mt-8">
                {homePage.founder.biography}
              </Button>
            </div>
          </div>
          <div className="mt-12 border border-white/10 bg-white/5 p-8 lg:ml-[calc(240px+3rem)]">
            <h3 className="font-serif text-lg font-semibold">{homePage.founder.experienceTitle}</h3>
            <p className="mt-4 text-sm text-white/70">
              {homePage.founder.experienceIntro} {adelRegal.countries.join(", ")}.
            </p>
            <ul className="mt-6 space-y-2">
              {adelRegal.focus.map((item) => (
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
            eyebrow={homePage.legacy.eyebrow}
            title={homePage.legacy.title}
            description={homePage.legacy.description}
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
          <SectionHeading eyebrow={homePage.process.eyebrow} title={homePage.process.title} centered />
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

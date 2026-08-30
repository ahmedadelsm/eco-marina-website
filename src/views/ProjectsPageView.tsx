"use client";

import { ButtonArrow } from "@/components/Button";
import { ProjectCard } from "@/components/CoreServiceCard";
import { useCms } from "@/components/cms/CmsProvider";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ProjectsPageView({ locale }: { locale: Locale }) {
  const { pages, homePage } = getContent(locale);
  const { projects } = useCms();
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <PageHero
        eyebrow={pages.projects.eyebrow}
        title={pages.projects.heading}
        description={pages.projects.intro}
        image="/images/projects/shipping-agency.jpg"
        imageAlt={pages.projects.imageAlt}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} viewLabel={homePage.cases.viewCase} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonArrow href={path("/contact")}>{pages.projects.cta}</ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

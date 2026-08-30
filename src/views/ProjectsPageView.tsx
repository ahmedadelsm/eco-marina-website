"use client";

import { ButtonArrow } from "@/components/Button";
import { ProjectCard } from "@/components/CoreServiceCard";
import { useCms } from "@/components/cms/CmsProvider";
import { PageHero } from "@/components/PageHero";
import { PageSeo } from "@/components/cms/PageSeo";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ProjectsPageView({ locale }: { locale: Locale }) {
  const { pages } = getContent(locale);
  const { projects, homepage, pageCopy } = useCms();
  const path = (href: string) => localePath(locale, href);
  const seoPath = locale === "nl" ? "/nl/projects" : "/projects";

  return (
    <>
      <PageSeo path={seoPath} fallbackTitle={pages.projects.title} fallbackDescription={pages.projects.description} />
      <PageHero
        eyebrow={pageCopy.projects.eyebrow}
        title={pageCopy.projects.heading}
        description={pageCopy.projects.intro}
        image="/images/projects/shipping-agency.jpg"
        imageAlt={pageCopy.projects.imageAlt}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} viewLabel={homepage.casesViewCase} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonArrow href={path("/contact")}>{pageCopy.projects.cta}</ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

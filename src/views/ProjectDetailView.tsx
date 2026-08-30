"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonArrow } from "@/components/Button";
import { CheckIcon } from "@/components/Icon";
import { useCms } from "@/components/cms/CmsProvider";
import { DetailHero } from "@/components/DetailHero";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ProjectDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const content = getContent(locale);
  const { getProject, projects, ui } = useCms();
  const path = (href: string) => localePath(locale, href);

  const staticProject = content.getProject(slug);
  const project = getProject(slug) ?? staticProject;
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <DetailHero
        image={project.image}
        imageAlt={project.title}
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold text-ink">{ui.challenge}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{project.challenge}</p>

              <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">{ui.approach}</h2>
              <ol className="mt-6 space-y-4">
                {project.approach.map((step, i) => (
                  <li key={step} className="flex gap-3 text-ink-muted">
                    <span className="font-semibold text-sea">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">{ui.outcomes}</h2>
              <ul className="mt-6 space-y-3">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-ink-muted">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sea" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-8">
              <div className="border border-line bg-paper p-6">
                <h2 className="font-serif text-lg font-semibold text-ink">{ui.projectDetails}</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-medium text-ink">{ui.location}</dt>
                    <dd className="mt-1 text-ink-muted">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">{ui.client}</dt>
                    <dd className="mt-1 text-ink-muted">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">{ui.category}</dt>
                    <dd className="mt-1 text-ink-muted">{project.category}</dd>
                  </div>
                </dl>
              </div>

              <div className="border border-line bg-white p-6">
                <h2 className="font-serif text-lg font-semibold text-ink">{ui.servicesDelivered}</h2>
                <ul className="mt-4 space-y-2">
                  {project.services.map((service) => (
                    <li key={service} className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sea" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <ButtonArrow href={path("/contact")}>{ui.discussSimilar}</ButtonArrow>
            </aside>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">{ui.moreCaseStudies}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={path(`/projects/${p.slug}`)} className="group border border-line bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">{p.category}</p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-ink group-hover:text-brand-blue">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

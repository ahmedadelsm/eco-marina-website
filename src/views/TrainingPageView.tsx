"use client";

import Image from "next/image";
import { ButtonArrow } from "@/components/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function TrainingPageView({ locale }: { locale: Locale }) {
  const { coreServices, ui } = getContent(locale);
  const { training: trainingCourses, trainingPage } = useCms();
  const service = coreServices[2];
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Training" : "Training"}
        title={trainingPage.title}
        description={trainingPage.description}
        image={service.image}
        imageAlt={service.shortTitle}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-3xl text-ink-muted">{service.description}</p>

          <div className="mt-12 space-y-8">
            {trainingCourses.map((course) => (
              <article key={course.id} className="overflow-hidden border border-line bg-white">
                <div className="grid lg:grid-cols-[240px_1fr]">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[220px]">
                    <Image
                      src={course.image}
                      alt={course.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 240px"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h2 className="font-serif text-xl font-semibold text-ink sm:text-2xl">{course.title}</h2>
                      <p className="text-sm text-ink-muted">
                        {course.duration} · {course.format}
                      </p>
                    </div>
                    <p className="mt-4 leading-relaxed text-ink-muted">{course.description}</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-semibold text-ink">{ui.topics}</h3>
                        <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                          {course.topics.map((topic) => (
                            <li key={topic}>· {topic}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-ink">{ui.audience}</h3>
                        <p className="mt-2 text-sm text-ink-muted">{course.audience}</p>
                        <h3 className="mt-4 text-sm font-semibold text-ink">{ui.groundedIn}</h3>
                        <p className="mt-2 text-sm text-ink-muted">{course.experience}</p>
                      </div>
                    </div>
                    <dl className="mt-6 grid gap-3 border-t border-line pt-6 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="font-semibold text-ink">{ui.pricing}</dt>
                        <dd className="mt-1 text-ink-muted">{course.pricing}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">{ui.schedule}</dt>
                        <dd className="mt-1 text-ink-muted">{course.schedule}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-line bg-paper p-6 sm:p-8">
            <p className="max-w-2xl text-ink-muted">{ui.trainingCta}</p>
            <ButtonArrow href={path("/contact")} className="mt-6">
              {ui.requestTraining}
            </ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import { ButtonArrow } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function TrainingPageView({ locale }: { locale: Locale }) {
  const { coreServices, trainingCourses, trainingIntro, ui } = getContent(locale);
  const service = coreServices[2];
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <PageHero
        eyebrow={locale === "nl" ? "Training" : "Training"}
        title={trainingIntro.title}
        description={trainingIntro.description}
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
                      <h2 className="font-serif text-xl font-semibold text-ink">{course.title}</h2>
                      <span className="text-sm text-ink-light">
                        {course.duration} · {course.format}
                      </span>
                    </div>
                    <p className="mt-3 text-ink-muted">{course.description}</p>
                    {"summaryNl" in course && course.summaryNl && locale === "nl" ? (
                      <p className="mt-2 text-sm text-ink-muted/90 italic">{course.summaryNl}</p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-muted">
                      <p>
                        <span className="font-semibold text-ink">{ui.pricing}:</span> {course.pricing}
                      </p>
                      <p>
                        <span className="font-semibold text-ink">{ui.schedule}:</span> {course.schedule}
                      </p>
                    </div>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-sea">{ui.topics}</p>
                        <ul className="mt-2 space-y-1">
                          {course.topics.map((t) => (
                            <li key={t} className="text-sm text-ink-muted">
                              · {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-sea">{ui.audience}</p>
                        <p className="mt-2 text-sm text-ink-muted">{course.audience}</p>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-sea">{ui.groundedIn}</p>
                        <p className="mt-2 text-sm text-ink-muted">{course.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-line bg-paper p-8 text-center">
            <p className="text-ink-muted">{ui.trainingCta}</p>
            <ButtonArrow href={path("/contact")} className="mt-6">
              {ui.requestTraining}
            </ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

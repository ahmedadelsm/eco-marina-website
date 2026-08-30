import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { coreServices, trainingCourses, trainingIntro } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Training & Workshops",
  description:
    "Practical environmental training — EIA workshops, marine monitoring, port compliance, industrial pollution control, and community awareness sessions.",
  path: "/training",
});

export default function TrainingPage() {
  const service = coreServices[2];

  return (
    <>
      <PageHero
        eyebrow="Training"
        title={trainingIntro.title}
        description={trainingIntro.description}
        image={service.image}
        imageAlt="Environmental and sustainability training workshop"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-3xl text-ink-muted">{service.description}</p>

          <div className="mt-12 space-y-6">
            {trainingCourses.map((course) => (
              <article key={course.id} className="border border-line bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-serif text-xl font-semibold text-ink">{course.title}</h2>
                  <span className="text-sm text-ink-light">
                    {course.duration} · {course.format}
                  </span>
                </div>
                <p className="mt-3 text-ink-muted">{course.description}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-sea">Topics</p>
                    <ul className="mt-2 space-y-1">
                      {course.topics.map((t) => (
                        <li key={t} className="text-sm text-ink-muted">
                          · {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-sea">Audience</p>
                    <p className="mt-2 text-sm text-ink-muted">{course.audience}</p>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-sea">Grounded in</p>
                    <p className="mt-2 text-sm text-ink-muted">{course.experience}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-line bg-paper p-8 text-center">
            <p className="text-ink-muted">
              Need a tailored in-house programme or a quote for your team? Tell us your sector, group size, and
              location — we will suggest the right format.
            </p>
            <ButtonArrow href="/contact" className="mt-6">
              Request training information
            </ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

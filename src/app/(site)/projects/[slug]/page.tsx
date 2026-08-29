import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonArrow } from "@/components/Button";
import { CheckIcon } from "@/components/Icon";
import { buildPageMetadata } from "@/lib/seo";
import { getProject, projects } from "@/content/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case Study" };
  return buildPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="relative min-h-[420px] overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image src={project.image} alt={project.title} fill className="photo-image object-cover" priority sizes="100vw" />
          <div className="page-hero-overlay absolute inset-0" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea-light">{project.category}</p>
          <h1 className="mt-2 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{project.summary}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold text-ink">Challenge</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{project.challenge}</p>

              <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">Approach</h2>
              <ol className="mt-6 space-y-4">
                {project.approach.map((step, i) => (
                  <li key={step} className="flex gap-3 text-ink-muted">
                    <span className="font-semibold text-sea">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <h2 className="mt-12 font-serif text-2xl font-semibold text-ink">Outcomes</h2>
              <ul className="mt-6 space-y-3">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-ink-muted">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sea" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-6">
              <div className="border border-line bg-paper p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-sea">Project details</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-ink-light">Location</dt>
                    <dd className="text-ink-muted">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-light">Client</dt>
                    <dd className="text-ink-muted">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-light">Category</dt>
                    <dd className="text-ink-muted">{project.category}</dd>
                  </div>
                </dl>
              </div>
              <div className="border border-line bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-sea">Services delivered</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="border border-line bg-paper px-3 py-1 text-xs text-ink-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <ButtonArrow href="/contact" className="w-full justify-center">
                Discuss a similar project
              </ButtonArrow>
            </aside>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">More case studies</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group border border-line bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sea">{p.category}</p>
                  <h3 className="mt-2 font-serif font-semibold text-ink group-hover:text-sea">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

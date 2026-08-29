import Image from "next/image";
import Link from "next/link";
import { Button, ButtonArrow } from "@/components/Button";
import { CoreServiceCard, ProjectCard } from "@/components/CoreServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  adelRegal,
  coreServices,
  hero,
  legacyServices,
  processSteps,
  projects,
  site,
  whyUs,
} from "@/content/site-content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[min(88vh,820px)] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image src={hero.image} alt={hero.imageAlt} fill className="object-cover opacity-35" priority sizes="100vw" />
          <div className="hero-overlay absolute inset-0" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sea-light">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">{hero.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonArrow href="/contact" size="lg">
              {hero.cta}
            </ButtonArrow>
            <Button href="/projects" variant="outline" size="lg" className="border-white/40 text-white hover:border-white hover:text-white">
              {hero.ctaSecondary}
            </Button>
          </div>
          <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-white/15 pt-10 sm:max-w-lg">
            <div>
              <dt className="font-serif text-3xl font-semibold">{site.stats.projects}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-white/50">Projects</dd>
            </div>
            <div>
              <dt className="font-serif text-3xl font-semibold">{site.stats.countries}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-white/50">Countries</dd>
            </div>
            <div>
              <dt className="font-serif text-3xl font-semibold">{site.since}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-white/50">Since</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Three core services */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Services"
            title="What we do"
            description="Impact assessment, environmental monitoring, and professional training — the three pillars of our consultancy."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {coreServices.map((service) => (
              <CoreServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why me — original copy from archived site */}
      <section className="border-y border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Eco Marina" title="Why work with us" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {whyUs.map((item) => (
              <div key={item.title} className="border-l-2 border-sea pl-6">
                <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies with real photos */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Cases" title="Selected case studies" description="From the original Eco Marina portfolio." />
            <Link href="/projects" className="text-sm font-medium text-sea hover:underline">
              View all cases →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Adel preview */}
      <section className="border-t border-line bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="About" title={`Who is ${adelRegal.name}?`} light />
              <p className="mt-6 text-lg text-white/85">{adelRegal.bioShort}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{adelRegal.bioLong[0]}</p>
              <Button href="/about" variant="outline" size="sm" className="mt-8 border-white/30 text-white hover:border-white">
                Full biography →
              </Button>
            </div>
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="font-serif text-lg font-semibold">International experience</h3>
              <p className="mt-4 text-sm text-white/70">
                Projects and research across {adelRegal.countries.join(", ")}.
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
        </div>
      </section>

      {/* Original service categories */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Full service range"
            title="Consultancy, industry, marine & waste"
            description="The complete service offering from eco-marina.com — still at the core of what we deliver."
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {legacyServices.map((service) => (
              <Link key={service.slug} href={service.href} className="group border border-line bg-white">
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

      {/* Process */}
      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Process" title="How we work" centered />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="bg-white p-6 border border-line">
                <span className="font-serif text-2xl text-sea/40">{step.step}</span>
                <h3 className="mt-2 font-serif font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-ink">Book your consultation appointment</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-muted">
            {site.email} · {site.phone} · {site.office}
          </p>
          <ButtonArrow href="/contact" className="mt-8">
            Contact us
          </ButtonArrow>
        </div>
      </section>
    </>
  );
}

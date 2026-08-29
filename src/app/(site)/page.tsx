import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CoreServiceCard, ProjectCard } from "@/components/CoreServiceCard";
import { HomeCta, HomeHero } from "@/components/HomeHero";
import { SectionHeading } from "@/components/SectionHeading";
import {
  adelRegal,
  coreServices,
  insights,
  legacyServices,
  mission,
  processSteps,
  projects,
  site,
  whyUs,
} from "@/content/site-content";

export default function HomePage() {
  return (
    <>
      <HomeHero />

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

      {/* Mission & values */}
      <section className="brand-ocean-section relative overflow-hidden border-y border-line py-16 sm:py-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="brand-accent-heading">
                <SectionHeading eyebrow="Mission" title="Science-backed, locally applied" />
              </div>
              <p className="mt-6 leading-relaxed text-ink-muted">{mission.mission}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{mission.approach}</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-ink">Our values</h3>
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

      {/* Why Eco Marina */}
      <section className="border-y border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Eco Marina" title="Why work with us" />
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

      {/* Case studies with real photos */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Cases"
              title="Selected case studies"
              description="Representative projects across shipping, industry, coastal infrastructure, and nature-based treatment."
            />
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
              <SectionHeading eyebrow="Founder" title={adelRegal.name} light />
              <p className="mt-2 text-sm text-sea-light">{adelRegal.title}</p>
              <p className="mt-6 text-lg text-white/85">{adelRegal.bioShort}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{adelRegal.bioLong[0]}</p>
              <blockquote className="mt-6 border-l-2 border-sea-light pl-4">
                <p className="font-serif italic text-white/80">&ldquo;{adelRegal.quote}&rdquo;</p>
              </blockquote>
              <Button href="/about" variant="outline-light" size="sm" className="mt-8">
                Full biography →
              </Button>
            </div>
          </div>
          <div className="mt-12 border border-white/10 bg-white/5 p-8 lg:ml-[calc(240px+3rem)]">
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
      </section>

      {/* Insights preview */}
      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Insights"
              title="Perspectives from the field"
              description="Practical guidance on sustainable tourism, compliance, and coastal development."
            />
            <Link href="/insights" className="text-sm font-medium text-sea hover:underline">
              All insights →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {insights.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="group border border-line bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-sea">
                  {article.category} · {article.readTime}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-ink group-hover:text-sea">{article.title}</h3>
                <p className="mt-2 text-sm text-ink-muted line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full service range */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Full service range"
            title="Consultancy, industry, marine & waste"
            description="Consultancy studies, industry services, tourism and marine work, and waste management."
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

      <HomeCta />
    </>
  );
}

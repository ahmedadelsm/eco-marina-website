import type { Metadata } from "next";
import Image from "next/image";
import { ButtonArrow } from "@/components/Button";
import { PartnersSection } from "@/components/PartnersSection";
import { PageHero } from "@/components/PageHero";
import { adelRegal, mission, site } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Adel Regal",
  description: `${adelRegal.name} — marine chemist, environmental consultant, and founder of ${site.name}. International experience across Egypt, Japan, Malta, Sweden, and the Netherlands.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={adelRegal.name}
        description={`${adelRegal.title} · Founder of ${site.name}`}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr]">
            <div className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden border border-line bg-paper">
                <Image
                  src={adelRegal.image}
                  alt={adelRegal.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm text-ink-muted lg:text-left">{adelRegal.title}</p>
            </div>
            <div>
              <p className="mt-6 text-xl leading-relaxed text-ink">{adelRegal.bioShort}</p>
              <div className="mt-8 space-y-4 text-ink-muted">
                {adelRegal.bioLong.map((p) => (
                  <p key={p.slice(0, 50)}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <blockquote className="mt-12 border-l-4 border-sea bg-paper py-4 pl-6 pr-4">
            <p className="font-serif text-lg italic text-ink">&ldquo;{adelRegal.quote}&rdquo;</p>
            <footer className="mt-2 text-xs text-ink-light">— {adelRegal.quoteSource}</footer>
          </blockquote>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Credentials</h2>
              <ul className="mt-6 grid gap-3">
                {adelRegal.credentials.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Career timeline</h2>
              <ol className="relative mt-10 border-l border-line pl-8">
                {adelRegal.timeline.map((item) => (
                  <li key={item.label} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-sea" />
                    <span className="text-sm font-semibold text-sea">{item.period}</span>
                    <p className="mt-1 text-ink-muted">{item.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Areas of work</h2>
              <ul className="mt-6 space-y-3">
                {adelRegal.focus.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Countries of experience</h2>
              <p className="mt-4 text-ink-muted">{adelRegal.countries.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">{site.name}</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-sea">{site.motto}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{mission.mission}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{mission.approach}</p>
          <h3 className="mt-8 font-serif text-lg font-semibold text-ink">Our values</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {site.values.map((value) => (
              <li key={value} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="text-sea">—</span> {value}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonArrow href="/contact">Get in touch</ButtonArrow>
            <a
              href={site.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-sea hover:underline"
            >
              LinkedIn profile →
            </a>
          </div>
        </div>
      </section>

      <PartnersSection />
    </>
  );
}

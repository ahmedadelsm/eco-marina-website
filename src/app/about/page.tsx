import type { Metadata } from "next";
import Link from "next/link";
import { ButtonArrow } from "@/components/Button";
import { PageHero } from "@/components/SectionHeading";
import { adelRegal, mission, partners, site } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About Adel Regal",
  description: `${adelRegal.name} — environmental consultant and founder of ${site.name}. International experience across Egypt, Japan, Malta, Sweden, and the Netherlands.`,
};

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
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed text-ink">{adelRegal.bioShort}</p>
            <div className="mt-8 space-y-4 text-ink-muted">
              {adelRegal.bioLong.map((p) => (
                <p key={p.slice(0, 50)}>{p}</p>
              ))}
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
              <h2 className="font-serif text-2xl font-semibold text-ink">Languages</h2>
              <ul className="mt-6 space-y-2 text-ink-muted">
                {adelRegal.languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">Countries of experience</h2>
              <p className="mt-4 text-ink-muted">{adelRegal.countries.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">{site.name}</h2>
          <p className="mt-4 max-w-2xl text-ink-muted">{mission.mission}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{mission.approach}</p>
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Partners</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {partners.map((p) => (
              <div key={p.name} className="border border-line bg-white px-6 py-4">
                <p className="font-medium text-ink">{p.name}</p>
                {p.location && <p className="mt-1 text-sm text-ink-muted">{p.location}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

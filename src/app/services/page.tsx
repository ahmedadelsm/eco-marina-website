import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonArrow } from "@/components/Button";
import { CoreServiceCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/SectionHeading";
import { coreServices, legacyServices } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Services",
  description: "Environmental impact assessment, monitoring programs, training, and full consultancy services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Our services"
        description="Environmental and social impact assessment, monitoring programs, and sustainability training — plus the full consultancy range from our original practice."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Core services</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {coreServices.map((s) => (
              <CoreServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Original service categories</h2>
          <p className="mt-2 max-w-2xl text-ink-muted">From the eco-marina.com portfolio (2021–2024).</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {legacyServices.map((service) => (
              <Link key={service.slug} href={service.href} className="group flex gap-5 border border-line bg-white p-4">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-paper">
                  <Image src={service.image} alt="" fill className="object-cover" sizes="128px" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-ink group-hover:text-sea">{service.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <ButtonArrow href="/contact">Request a proposal</ButtonArrow>
      </section>
    </>
  );
}

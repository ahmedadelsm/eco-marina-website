import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonArrow } from "@/components/Button";
import { CoreServiceCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/SectionHeading";
import { coreServices, legacyServices, serviceCategories } from "@/content/site-content";

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
        description="Environmental and social impact assessment, monitoring programs, and sustainability training for governments, industry, and coastal development."
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
          <h2 className="font-serif text-2xl font-semibold text-ink">Specialist consultancy areas</h2>
          <p className="mt-2 max-w-2xl text-ink-muted">
            Tailored support across tourism, industry, research collaboration, and regulatory compliance.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {serviceCategories.map((cat) => (
              <div key={cat.title} className="border border-line bg-white">
                <div className="relative aspect-[16/7] overflow-hidden bg-paper">
                  <Image src={cat.image} alt="" fill className="photo-image object-cover" sizes="50vw" />
                  <div className="photo-tint absolute inset-0" aria-hidden />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink">{cat.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{cat.description}</p>
                  <ul className="mt-4 space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-ink-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sea" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Consultancy, industry, marine & waste</h2>
          <p className="mt-2 max-w-2xl text-ink-muted">
            Broader consultancy areas we support alongside our core services.
          </p>
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

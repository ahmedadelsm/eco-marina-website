import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Button";
import { PageHero } from "@/components/SectionHeading";
import { resources, site } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Environmental guides, checklists, and templates from Eco Marina — for developers, tourism operators, and communities.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Practical tools for sustainable impact"
        description="Guides, checklists, and templates to support eco-conscious decisions — available on request from our consultancy team."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {resources.map((group) => (
              <div key={group.category}>
                <h2 className="font-serif text-xl font-semibold text-ink">{group.category}</h2>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.title} className="border border-line bg-white p-5">
                      <h3 className="font-medium text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-line bg-paper p-8 text-center sm:p-12">
            <h2 className="font-serif text-2xl font-semibold text-ink">Request resources</h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-muted">
              These materials are provided to clients and project partners. Contact us to request access or discuss tailored
              versions for your organisation.
            </p>
            <p className="mt-4 text-sm text-ink-light">{site.email}</p>
            <ButtonArrow href="/contact" className="mt-6">
              Get in touch
            </ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

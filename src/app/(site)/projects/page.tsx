import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Button";
import { ProjectCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: "Environmental consulting case studies from Eco Marina — shipping, industrial, wastewater, and coastal projects.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cases"
        title="Case studies"
        description="Environmental consulting projects across shipping, industry, wastewater treatment, and coastal infrastructure."
        image="/images/projects/shipping-agency.jpg"
        imageAlt="Environmental regulations implementation for shipping agency"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonArrow href="/contact">Discuss a similar project</ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Button";
import { ProjectCard } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/SectionHeading";
import { projects } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Environmental consulting case studies from Eco Marina — shipping, industrial, wastewater, and coastal projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cases"
        title="Case studies"
        description="Selected projects from the Eco Marina portfolio. Images and titles from the original eco-marina.com website."
        image="/images/projects/shipping-agency.png"
        imageAlt="Environmental regulations implementation for shipping agency"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-ink-light">
            These case studies were published on eco-marina.com between 2021 and 2024.
          </p>
          <div className="mt-8 text-center">
            <ButtonArrow href="/contact">Discuss a similar project</ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

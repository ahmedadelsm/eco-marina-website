import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Button";
import { ServiceDetailLayout } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { coreServices, impactAssessmentDetail } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Environmental & Social Impact Assessment",
  description: "EIA and environmental impact assessment studies for industrial, marine, tourism, and infrastructure projects.",
};

export default function ImpactAssessmentPage() {
  const service = coreServices[0];

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.tagline} />

      <ServiceDetailLayout service={service}>
        <p className="mt-6 text-sm text-ink-muted">{impactAssessmentDetail.overview}</p>
        <ol className="mt-8 space-y-4">
          {impactAssessmentDetail.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-ink-muted">
              <span className="font-semibold text-sea">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </ServiceDetailLayout>

      <div className="border-t border-line py-12 text-center">
        <ButtonArrow href="/contact">Discuss your EIA project</ButtonArrow>
      </div>
    </>
  );
}

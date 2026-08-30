"use client";

import { ButtonArrow } from "@/components/Button";
import { ServiceDetailLayout } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { useCms } from "@/components/cms/CmsProvider";
import { localePath, type Locale } from "@/lib/i18n";

export function ImpactAssessmentPageView({ locale }: { locale: Locale }) {
  const { coreServices, pageCopy } = useCms();
  const service = coreServices[0];
  const path = (href: string) => localePath(locale, href);
  const detail = pageCopy.impactAssessment;

  return (
    <>
      <PageHero eyebrow={detail.serviceEyebrow} title={service.title} description={service.tagline} />
      <ServiceDetailLayout service={service} showTitle={false}>
        <p className="mt-6 text-sm text-ink-muted">{detail.overview}</p>
        <ol className="mt-8 space-y-4">
          {detail.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-ink-muted">
              <span className="font-semibold text-sea">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </ServiceDetailLayout>
      <div className="border-t border-line py-12 text-center">
        <ButtonArrow href={path("/contact")}>{detail.cta}</ButtonArrow>
      </div>
    </>
  );
}

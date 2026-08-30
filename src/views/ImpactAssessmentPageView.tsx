import { ButtonArrow } from "@/components/Button";
import { ServiceDetailLayout } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ImpactAssessmentPageView({ locale }: { locale: Locale }) {
  const { coreServices, impactAssessmentDetail, pages } = getContent(locale);
  const service = coreServices[0];
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <PageHero eyebrow={pages.impactAssessment.serviceEyebrow} title={service.title} description={service.tagline} />
      <ServiceDetailLayout service={service} showTitle={false}>
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
        <ButtonArrow href={path("/contact")}>{pages.impactAssessment.cta}</ButtonArrow>
      </div>
    </>
  );
}

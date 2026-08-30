import { ButtonArrow } from "@/components/Button";
import { ServiceDetailLayout } from "@/components/CoreServiceCard";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function MonitoringPageView({ locale }: { locale: Locale }) {
  const { coreServices, monitoringDetail, pages } = getContent(locale);
  const service = coreServices[1];
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <PageHero eyebrow={pages.monitoring.serviceEyebrow} title={service.title} description={service.tagline} />
      <ServiceDetailLayout service={service} showTitle={false}>
        <p className="mt-6 text-sm text-ink-muted">{monitoringDetail.overview}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {monitoringDetail.areas.map((area) => (
            <div key={area.name} className="border border-line bg-paper p-4">
              <h4 className="text-sm font-semibold text-ink">{area.name}</h4>
              <ul className="mt-2 space-y-1">
                {area.items.map((item) => (
                  <li key={item} className="text-xs text-ink-muted">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ServiceDetailLayout>
      <div className="border-t border-line py-12 text-center">
        <ButtonArrow href={path("/contact")}>{pages.monitoring.cta}</ButtonArrow>
      </div>
    </>
  );
}

import { ButtonArrow } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ResourcesContactEmail } from "@/components/ResourcesContactEmail";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export function ResourcesPageView({ locale }: { locale: Locale }) {
  const { resources, pages, ui } = getContent(locale);
  const path = (href: string) => localePath(locale, href);

  return (
    <>
      <PageHero eyebrow={pages.resources.eyebrow} title={pages.resources.heading} description={pages.resources.intro} />
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
            <h2 className="font-serif text-2xl font-semibold text-ink">{pages.resources.requestTitle}</h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-muted">{pages.resources.requestIntro}</p>
            <ResourcesContactEmail />
            <ButtonArrow href={path("/contact")} className="mt-6 w-full sm:w-auto">
              {ui.getInTouch}
            </ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}

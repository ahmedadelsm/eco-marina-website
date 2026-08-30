import * as en from "@/content/en/site-content";
import * as nl from "@/content/nl/site-content";
import type {
  CmsAbout,
  CmsHomepage,
  CmsInsight,
  CmsSeoEntry,
  CmsServices,
} from "./types";

export function pairText(enText: string, nlText: string) {
  return { en: enText, nl: nlText };
}

export function pairList(enItems: string[], nlItems: string[]) {
  return { en: enItems, nl: nlItems };
}

export function defaultCmsInsights(): CmsInsight[] {
  return en.insights.map((item, index) => {
    const nlItem = nl.insights[index];
    return {
      id: item.slug,
      slug: item.slug,
      published: true,
      category: pairText(item.category, nlItem.category),
      readTime: pairText(item.readTime, nlItem.readTime),
      date: pairText(item.date, nlItem.date),
      datePublished: item.datePublished,
      image: item.image,
      title: pairText(item.title, nlItem.title),
      excerpt: pairText(item.excerpt, nlItem.excerpt),
      sections: item.sections.map((section, sIndex) => {
        const nlSection = nlItem.sections[sIndex];
        return {
          id: `${item.slug}-${sIndex}`,
          heading: pairText(section.heading, nlSection.heading),
          body: pairText(section.body, nlSection.body),
        };
      }),
    };
  });
}

export function defaultCmsAbout(): CmsAbout {
  return {
    name: pairText(en.adelRegal.name, nl.adelRegal.name),
    title: pairText(en.adelRegal.title, nl.adelRegal.title),
    image: en.adelRegal.image,
    imageAlt: pairText(en.adelRegal.imageAlt, nl.adelRegal.imageAlt),
    bioShort: pairText(en.adelRegal.bioShort, nl.adelRegal.bioShort),
    bioLong: pairList([...en.adelRegal.bioLong], [...nl.adelRegal.bioLong]),
    credentials: pairList([...en.adelRegal.credentials], [...nl.adelRegal.credentials]),
    timeline: en.adelRegal.timeline.map((item, index) => {
      const nlItem = nl.adelRegal.timeline[index];
      return {
        id: `timeline-${index}`,
        period: pairText(item.period, nlItem.period),
        label: pairText(item.label, nlItem.label),
      };
    }),
    focus: pairList([...en.adelRegal.focus], [...nl.adelRegal.focus]),
    countries: pairList([...en.adelRegal.countries], [...nl.adelRegal.countries]),
    quote: pairText(en.adelRegal.quote, nl.adelRegal.quote),
    quoteSource: pairText(en.adelRegal.quoteSource, nl.adelRegal.quoteSource),
    mission: pairText(en.mission.mission, nl.mission.mission),
    approach: pairText(en.mission.approach, nl.mission.approach),
    values: pairList([...en.site.values], [...nl.site.values]),
  };
}

export function defaultCmsHomepage(): CmsHomepage {
  return {
    servicesEyebrow: pairText(en.homePage.services.eyebrow, nl.homePage.services.eyebrow),
    servicesTitle: pairText(en.homePage.services.title, nl.homePage.services.title),
    servicesDescription: pairText(en.homePage.services.description, nl.homePage.services.description),
    missionEyebrow: pairText(en.homePage.mission.eyebrow, nl.homePage.mission.eyebrow),
    missionTitle: pairText(en.homePage.mission.title, nl.homePage.mission.title),
    missionValuesTitle: pairText(en.homePage.mission.valuesTitle, nl.homePage.mission.valuesTitle),
    missionText: pairText(en.mission.mission, nl.mission.mission),
    missionApproach: pairText(en.mission.approach, nl.mission.approach),
    whyUsEyebrow: pairText(en.homePage.whyUs.eyebrow, nl.homePage.whyUs.eyebrow),
    whyUsTitle: pairText(en.homePage.whyUs.title, nl.homePage.whyUs.title),
    casesEyebrow: pairText(en.homePage.cases.eyebrow, nl.homePage.cases.eyebrow),
    casesTitle: pairText(en.homePage.cases.title, nl.homePage.cases.title),
    casesDescription: pairText(en.homePage.cases.description, nl.homePage.cases.description),
  };
}

export function defaultCmsServices(): CmsServices {
  return {
    intro: pairText(en.pages.services.intro, nl.pages.services.intro),
    coreTitle: pairText(en.pages.services.coreTitle, nl.pages.services.coreTitle),
    specialistTitle: pairText(en.pages.services.specialistTitle, nl.pages.services.specialistTitle),
    specialistIntro: pairText(en.pages.services.specialistIntro, nl.pages.services.specialistIntro),
    legacyTitle: pairText(en.pages.services.legacyTitle, nl.pages.services.legacyTitle),
    legacyIntro: pairText(en.pages.services.legacyIntro, nl.pages.services.legacyIntro),
    cta: pairText(en.pages.services.cta, nl.pages.services.cta),
    coreServices: en.coreServices.map((service, index) => {
      const nlService = nl.coreServices[index];
      return {
        id: service.slug,
        slug: service.slug,
        title: pairText(service.title, nlService.title),
        shortTitle: pairText(service.shortTitle, nlService.shortTitle),
        tagline: pairText(service.tagline, nlService.tagline),
        description: pairText(service.description, nlService.description),
        href: service.href,
        image: service.image,
        deliverables: pairList([...service.deliverables], [...nlService.deliverables]),
        sectors: pairList([...service.sectors], [...nlService.sectors]),
      };
    }),
  };
}

const SEO_ROUTES = [
  { path: "/", titleKey: "home" as const },
  { path: "/about", page: "about" as const },
  { path: "/services", page: "services" as const },
  { path: "/training", page: "training" as const },
  { path: "/projects", page: "projects" as const },
  { path: "/insights", page: "insights" as const },
  { path: "/faq", page: "faq" as const },
  { path: "/contact", page: "contact" as const },
  { path: "/resources", page: "resources" as const },
];

export function defaultCmsSeo(): CmsSeoEntry[] {
  return SEO_ROUTES.map((route) => {
    if (route.path === "/") {
      return {
        path: route.path,
        title: pairText("Eco Marina — Environmental Consultancy", "Eco Marina — Milieuadvies"),
        description: pairText(
          "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.",
          "Milieu- en sociale effectbeoordeling, monitoringprogramma's en duurzaamheidstraining. Gevestigd in Utrecht, Nederland."
        ),
      };
    }
    const page = route.page!;
    const enPage = en.pages[page] as { title: string; description?: string };
    const nlPage = nl.pages[page] as { title: string; description?: string };
    const enDescription =
      enPage.description ??
      "Environmental consultancy services from Eco Marina — impact assessment, monitoring, and training.";
    const nlDescription =
      nlPage.description ??
      "Milieuadvies van Eco Marina — effectbeoordeling, monitoring en training.";
    return {
      path: route.path,
      title: pairText(enPage.title, nlPage.title),
      description: pairText(enDescription, nlDescription),
    };
  });
}

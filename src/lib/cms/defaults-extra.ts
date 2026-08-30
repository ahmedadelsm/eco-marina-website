import * as en from "@/content/en/site-content";
import * as nl from "@/content/nl/site-content";
import type {
  CmsAbout,
  CmsContact,
  CmsHero,
  CmsHomepage,
  CmsInsight,
  CmsNavigation,
  CmsPages,
  CmsPartner,
  CmsResources,
  CmsSeoEntry,
  CmsServices,
  CmsTrainingPage,
  CmsUi,
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
    whyUsCards: en.whyUs.map((card, index) => ({
      id: `why-us-${index}`,
      title: pairText(card.title, nl.whyUs[index].title),
      description: pairText(card.description, nl.whyUs[index].description),
    })),
    casesEyebrow: pairText(en.homePage.cases.eyebrow, nl.homePage.cases.eyebrow),
    casesTitle: pairText(en.homePage.cases.title, nl.homePage.cases.title),
    casesDescription: pairText(en.homePage.cases.description, nl.homePage.cases.description),
    legacyEyebrow: pairText(en.homePage.legacy.eyebrow, nl.homePage.legacy.eyebrow),
    legacyTitle: pairText(en.homePage.legacy.title, nl.homePage.legacy.title),
    legacyDescription: pairText(en.homePage.legacy.description, nl.homePage.legacy.description),
    processEyebrow: pairText(en.homePage.process.eyebrow, nl.homePage.process.eyebrow),
    processTitle: pairText(en.homePage.process.title, nl.homePage.process.title),
    processSteps: en.processSteps.map((step, index) => ({
      id: `process-${index}`,
      step: pairText(step.step, nl.processSteps[index].step),
      title: pairText(step.title, nl.processSteps[index].title),
      description: pairText(step.description, nl.processSteps[index].description),
    })),
    casesViewAll: pairText(en.homePage.cases.viewAll, nl.homePage.cases.viewAll),
    casesViewCase: pairText(en.homePage.cases.viewCase, nl.homePage.cases.viewCase),
    founderEyebrow: pairText(en.homePage.founder.eyebrow, nl.homePage.founder.eyebrow),
    founderBiography: pairText(en.homePage.founder.biography, nl.homePage.founder.biography),
    founderExperienceTitle: pairText(en.homePage.founder.experienceTitle, nl.homePage.founder.experienceTitle),
    founderExperienceIntro: pairText(en.homePage.founder.experienceIntro, nl.homePage.founder.experienceIntro),
    insightsEyebrow: pairText(en.homePage.insights.eyebrow, nl.homePage.insights.eyebrow),
    insightsTitle: pairText(en.homePage.insights.title, nl.homePage.insights.title),
    insightsDescription: pairText(en.homePage.insights.description, nl.homePage.insights.description),
    insightsViewAll: pairText(en.homePage.insights.viewAll, nl.homePage.insights.viewAll),
    insightsReadArticle: pairText(en.homePage.insights.readArticle, nl.homePage.insights.readArticle),
    homeCtaTitle: pairText(en.ui.bookConsultation, nl.ui.bookConsultation),
    homeCtaButton: pairText(en.ui.contactUs, nl.ui.contactUs),
  };
}

export function defaultCmsServices(): CmsServices {
  return {
    intro: pairText(en.pages.services.intro, nl.pages.services.intro),
    coreTitle: pairText(en.pages.services.coreTitle, nl.pages.services.coreTitle),
    specialistTitle: pairText(en.pages.services.specialistTitle, nl.pages.services.specialistTitle),
    specialistIntro: pairText(en.pages.services.specialistIntro, nl.pages.services.specialistIntro),
    specialistCategories: en.serviceCategories.map((cat, index) => ({
      id: `category-${index}`,
      title: pairText(cat.title, nl.serviceCategories[index].title),
      description: pairText(cat.description, nl.serviceCategories[index].description),
      items: pairList([...cat.items], [...nl.serviceCategories[index].items]),
      image: cat.image,
    })),
    legacyTitle: pairText(en.pages.services.legacyTitle, nl.pages.services.legacyTitle),
    legacyIntro: pairText(en.pages.services.legacyIntro, nl.pages.services.legacyIntro),
    legacyServices: en.legacyServices.map((service, index) => ({
      id: service.slug,
      slug: service.slug,
      title: pairText(service.title, nl.legacyServices[index].title),
      description: pairText(service.description, nl.legacyServices[index].description),
      image: service.image,
      href: service.href,
    })),
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

export function defaultCmsPartners(): CmsPartner[] {
  return en.partners.map((partner, index) => ({
    id: partner.id,
    published: partner.enabledByDefault,
    name: pairText(partner.name, nl.partners[index].name),
    location: pairText(partner.location, nl.partners[index].location),
    logo: partner.logo,
  }));
}

export function defaultCmsContact(): CmsContact {
  return {
    eyebrow: pairText(en.ui.contactPage.eyebrow, nl.ui.contactPage.eyebrow),
    title: pairText(en.ui.contactPage.title, nl.ui.contactPage.title),
    pageIntro: pairText(en.ui.contactPage.intro, nl.ui.contactPage.intro),
    responseTime: pairText(en.ui.contactPage.responseTime, nl.ui.contactPage.responseTime),
    getInTouch: pairText(en.ui.contactPage.getInTouch, nl.ui.contactPage.getInTouch),
    emailLabel: pairText(en.ui.contactPage.email, nl.ui.contactPage.email),
    phoneLabel: pairText(en.ui.contactPage.phone, nl.ui.contactPage.phone),
    officeLabel: pairText(en.ui.contactPage.office, nl.ui.contactPage.office),
    serviceOptions: [
      {
        id: "impact-assessment",
        value: "impact-assessment",
        label: pairText(en.ui.form.services.impact, nl.ui.form.services.impact),
      },
      {
        id: "monitoring",
        value: "monitoring",
        label: pairText(en.ui.form.services.monitoring, nl.ui.form.services.monitoring),
      },
      {
        id: "training",
        value: "training",
        label: pairText(en.ui.form.services.training, nl.ui.form.services.training),
      },
      {
        id: "other",
        value: "other",
        label: pairText(en.ui.form.services.other, nl.ui.form.services.other),
      },
    ],
  };
}

export function defaultCmsResources(): CmsResources {
  return {
    eyebrow: pairText(en.pages.resources.eyebrow, nl.pages.resources.eyebrow),
    heading: pairText(en.pages.resources.heading, nl.pages.resources.heading),
    intro: pairText(en.pages.resources.intro, nl.pages.resources.intro),
    requestTitle: pairText(en.pages.resources.requestTitle, nl.pages.resources.requestTitle),
    requestIntro: pairText(en.pages.resources.requestIntro, nl.pages.resources.requestIntro),
    groups: en.resources.map((group, groupIndex) => ({
      id: `resource-group-${groupIndex}`,
      category: pairText(group.category, nl.resources[groupIndex].category),
      items: group.items.map((item, itemIndex) => ({
        id: `resource-${groupIndex}-${itemIndex}`,
        title: pairText(item.title, nl.resources[groupIndex].items[itemIndex].title),
        description: pairText(item.description, nl.resources[groupIndex].items[itemIndex].description),
      })),
    })),
  };
}

export function defaultCmsTrainingPage(): CmsTrainingPage {
  return {
    eyebrow: pairText("Training", "Trainingen"),
    title: pairText(en.trainingIntro.title, nl.trainingIntro.title),
    description: pairText(en.trainingIntro.description, nl.trainingIntro.description),
  };
}

export function defaultCmsHero(): CmsHero {
  return {
    eyebrow: pairText(en.hero.eyebrow, nl.hero.eyebrow),
    headline: pairText(en.hero.headline, nl.hero.headline),
    subheadline: pairText(en.hero.subheadline, nl.hero.subheadline),
    cta: pairText(en.hero.cta, nl.hero.cta),
    ctaSecondary: pairText(en.hero.ctaSecondary, nl.hero.ctaSecondary),
    image: en.hero.image,
    imageAlt: pairText(en.hero.imageAlt, nl.hero.imageAlt),
  };
}

export function defaultCmsPages(): CmsPages {
  return {
    projects: {
      eyebrow: pairText(en.pages.projects.eyebrow, nl.pages.projects.eyebrow),
      heading: pairText(en.pages.projects.heading, nl.pages.projects.heading),
      intro: pairText(en.pages.projects.intro, nl.pages.projects.intro),
      cta: pairText(en.pages.projects.cta, nl.pages.projects.cta),
      image: "/images/projects/shipping-agency.jpg",
      imageAlt: pairText(en.pages.projects.imageAlt, nl.pages.projects.imageAlt),
    },
    insights: {
      eyebrow: pairText(en.pages.insights.eyebrow, nl.pages.insights.eyebrow),
      heading: pairText(en.pages.insights.heading, nl.pages.insights.heading),
      intro: pairText(en.pages.insights.intro, nl.pages.insights.intro),
      writtenBy: pairText(en.pages.insights.writtenBy, nl.pages.insights.writtenBy),
      founderNote: pairText(en.pages.insights.founderNote, nl.pages.insights.founderNote),
      discuss: pairText(en.pages.insights.discuss, nl.pages.insights.discuss),
    },
    services: {
      eyebrow: pairText(en.pages.services.eyebrow, nl.pages.services.eyebrow),
      heading: pairText(en.pages.services.heading, nl.pages.services.heading),
    },
    faq: {
      eyebrow: pairText(en.pages.faq.eyebrow, nl.pages.faq.eyebrow),
      heading: pairText(en.pages.faq.heading, nl.pages.faq.heading),
    },
    about: {
      eyebrow: pairText(en.pages.about.eyebrow, nl.pages.about.eyebrow),
      founderOf: pairText(en.pages.about.founderOf, nl.pages.about.founderOf),
      credentials: pairText(en.pages.about.credentials, nl.pages.about.credentials),
      careerTimeline: pairText(en.pages.about.careerTimeline, nl.pages.about.careerTimeline),
      areasOfWork: pairText(en.pages.about.areasOfWork, nl.pages.about.areasOfWork),
      countries: pairText(en.pages.about.countries, nl.pages.about.countries),
      ourValues: pairText(en.pages.about.ourValues, nl.pages.about.ourValues),
      linkedIn: pairText(en.pages.about.linkedIn, nl.pages.about.linkedIn),
    },
    impactAssessment: {
      serviceEyebrow: pairText(en.pages.impactAssessment.serviceEyebrow, nl.pages.impactAssessment.serviceEyebrow),
      cta: pairText(en.pages.impactAssessment.cta, nl.pages.impactAssessment.cta),
      overview: pairText(en.impactAssessmentDetail.overview, nl.impactAssessmentDetail.overview),
      steps: pairList([...en.impactAssessmentDetail.steps], [...nl.impactAssessmentDetail.steps]),
    },
    monitoring: {
      serviceEyebrow: pairText(en.pages.monitoring.serviceEyebrow, nl.pages.monitoring.serviceEyebrow),
      cta: pairText(en.pages.monitoring.cta, nl.pages.monitoring.cta),
      overview: pairText(en.monitoringDetail.overview, nl.monitoringDetail.overview),
      areas: en.monitoringDetail.areas.map((area, index) => ({
        id: `area-${index}`,
        name: pairText(area.name, nl.monitoringDetail.areas[index].name),
        items: pairList([...area.items], [...nl.monitoringDetail.areas[index].items]),
      })),
    },
  };
}

export function defaultCmsNavigation(): CmsNavigation {
  return {
    header: en.nav.map((item, index) => {
      const nlItem = nl.nav[index];
      return {
        id: `nav-${index}`,
        label: pairText(item.label, nlItem.label),
        href: item.href,
        children:
          "children" in item && item.children
            ? item.children.map((child, childIndex) => {
                const nlChildren = "children" in nlItem ? nlItem.children : undefined;
                return {
                  id: `nav-${index}-${childIndex}`,
                  label: pairText(child.label, nlChildren?.[childIndex]?.label ?? child.label),
                  href: child.href,
                };
              })
            : undefined,
      };
    }),
    footer: en.footerNav.map((item, index) => ({
      id: `footer-${index}`,
      label: pairText(item.label, nl.footerNav[index].label),
      href: item.href,
    })),
  };
}

const SEO_ROUTES = [
  { path: "/", titleKey: "home" as const },
  { path: "/about", page: "about" as const },
  { path: "/services", page: "services" as const },
  { path: "/services/impact-assessment", page: "impactAssessment" as const },
  { path: "/services/monitoring", page: "monitoring" as const },
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

export function defaultCmsUi(): CmsUi {
  return {
    contact: pairText(en.ui.contact, nl.ui.contact),
    skipToContent: pairText(en.ui.skipToContent, nl.ui.skipToContent),
    openMenu: pairText(en.ui.openMenu, nl.ui.openMenu),
    closeMenu: pairText(en.ui.closeMenu, nl.ui.closeMenu),
    pagesLabel: pairText(en.ui.pages, nl.ui.pages),
    connect: pairText(en.ui.connect, nl.ui.connect),
    footerSince: pairText(en.ui.footerSince, nl.ui.footerSince),
    footerServices: pairText(en.ui.footerServices, nl.ui.footerServices),
    footerRegions: pairText(en.ui.footerRegions, nl.ui.footerRegions),
    projects: pairText(en.ui.projects, nl.ui.projects),
    countries: pairText(en.ui.countries, nl.ui.countries),
    since: pairText(en.ui.since, nl.ui.since),
    challenge: pairText(en.ui.challenge, nl.ui.challenge),
    approach: pairText(en.ui.approach, nl.ui.approach),
    outcomes: pairText(en.ui.outcomes, nl.ui.outcomes),
    projectDetails: pairText(en.ui.projectDetails, nl.ui.projectDetails),
    location: pairText(en.ui.location, nl.ui.location),
    client: pairText(en.ui.client, nl.ui.client),
    category: pairText(en.ui.category, nl.ui.category),
    servicesDelivered: pairText(en.ui.servicesDelivered, nl.ui.servicesDelivered),
    discussSimilar: pairText(en.ui.discussSimilar, nl.ui.discussSimilar),
    moreCaseStudies: pairText(en.ui.moreCaseStudies, nl.ui.moreCaseStudies),
    getInTouch: pairText(en.ui.getInTouch, nl.ui.getInTouch),
    topics: pairText(en.ui.topics, nl.ui.topics),
    audience: pairText(en.ui.audience, nl.ui.audience),
    groundedIn: pairText(en.ui.groundedIn, nl.ui.groundedIn),
    pricing: pairText(en.ui.pricing, nl.ui.pricing),
    schedule: pairText(en.ui.schedule, nl.ui.schedule),
    trainingCta: pairText(en.ui.trainingCta, nl.ui.trainingCta),
    requestTraining: pairText(en.ui.requestTraining, nl.ui.requestTraining),
    deliverables: pairText(en.ui.deliverables, nl.ui.deliverables),
    sectors: pairText(en.ui.sectors, nl.ui.sectors),
    detailsLink: pairText(en.ui.detailsLink, nl.ui.detailsLink),
    loading: pairText(en.ui.loading, nl.ui.loading),
    partners: pairText(en.ui.partners, nl.ui.partners),
    language: pairText(en.ui.language, nl.ui.language),
    formFirstName: pairText(en.ui.form.firstName, nl.ui.form.firstName),
    formLastName: pairText(en.ui.form.lastName, nl.ui.form.lastName),
    formEmail: pairText(en.ui.form.email, nl.ui.form.email),
    formOrganization: pairText(en.ui.form.organization, nl.ui.form.organization),
    formServiceInterest: pairText(en.ui.form.serviceInterest, nl.ui.form.serviceInterest),
    formSelectService: pairText(en.ui.form.selectService, nl.ui.form.selectService),
    formMessage: pairText(en.ui.form.message, nl.ui.form.message),
    formMessagePlaceholder: pairText(en.ui.form.messagePlaceholder, nl.ui.form.messagePlaceholder),
    formSend: pairText(en.ui.form.send, nl.ui.form.send),
    formSending: pairText(en.ui.form.sending, nl.ui.form.sending),
    formCaptcha: pairText(en.ui.form.captcha, nl.ui.form.captcha),
    formError: pairText(en.ui.form.error, nl.ui.form.error),
    formThankYou: pairText(en.ui.form.thankYou, nl.ui.form.thankYou),
    formReceived: pairText(en.ui.form.received, nl.ui.form.received),
  };
}

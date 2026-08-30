import { projects as enProjects } from "@/content/en/site-content";
import { faq as enFaq } from "@/content/en/site-content";
import { trainingCourses as enTraining } from "@/content/en/site-content";
import { site as enSite } from "@/content/en/site-content";
import { projects as nlProjects } from "@/content/nl/site-content";
import { faq as nlFaq } from "@/content/nl/site-content";
import { trainingCourses as nlTraining } from "@/content/nl/site-content";
import { site as nlSite } from "@/content/nl/site-content";
import type { CmsCompany, CmsFaqSection, CmsProject, CmsTrainingCourse } from "./types";

function pairText(en: string, nl: string) {
  return { en, nl };
}

function pairList(en: string[], nl: string[]) {
  return { en, nl };
}

export function defaultCmsProjects(): CmsProject[] {
  return enProjects.map((en, index) => {
    const nl = nlProjects[index];
    return {
      id: en.slug,
      slug: en.slug,
      published: true,
      image: en.image,
      category: pairText(en.category, nl.category),
      title: pairText(en.title, nl.title),
      summary: pairText(en.summary, nl.summary),
      location: pairText(en.location, nl.location),
      client: pairText(en.client, nl.client),
      challenge: pairText(en.challenge, nl.challenge),
      approach: pairList([...en.approach], [...nl.approach]),
      outcomes: pairList([...en.outcomes], [...nl.outcomes]),
      services: pairList([...en.services], [...nl.services]),
    };
  });
}

export function defaultCmsTraining(): CmsTrainingCourse[] {
  return enTraining.map((en, index) => {
    const nl = nlTraining[index];
    return {
      id: en.id,
      published: true,
      duration: pairText(en.duration, nl.duration),
      format: pairText(en.format, nl.format),
      image: en.image,
      imageAlt: pairText(en.imageAlt, nl.imageAlt),
      title: pairText(en.title, nl.title),
      description: pairText(en.description, nl.description),
      topics: pairList([...en.topics], [...nl.topics]),
      audience: pairText(en.audience, nl.audience),
      experience: pairText(en.experience, nl.experience),
      pricing: pairText(en.pricing, nl.pricing),
      schedule: pairText(en.schedule, nl.schedule),
    };
  });
}

export function defaultCmsFaq(): CmsFaqSection[] {
  return enFaq.map((enSection, sectionIndex) => {
    const nlSection = nlFaq[sectionIndex];
    return {
      id: `faq-${sectionIndex}`,
      category: pairText(enSection.category, nlSection.category),
      questions: enSection.questions.map((enQ, qIndex) => {
        const nlQ = nlSection.questions[qIndex];
        return {
          id: `faq-${sectionIndex}-${qIndex}`,
          q: pairText(enQ.q, nlQ.q),
          a: pairText(enQ.a, nlQ.a),
        };
      }),
    };
  });
}

export function defaultCmsCompany(): CmsCompany {
  return {
    tagline: pairText(enSite.tagline, nlSite.tagline),
    motto: pairText(enSite.motto, nlSite.motto),
    linkedIn: enSite.linkedIn,
    since: enSite.since,
    statsProjects: enSite.stats.projects,
    statsCountries: enSite.stats.countries,
  };
}

export {
  defaultCmsAbout,
  defaultCmsContact,
  defaultCmsHomepage,
  defaultCmsInsights,
  defaultCmsPartners,
  defaultCmsResources,
  defaultCmsSeo,
  defaultCmsServices,
  defaultCmsTrainingPage,
  pairList,
  pairText,
} from "./defaults-extra";

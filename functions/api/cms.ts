import { getCmsCollection } from "../lib/cms/storage";
import type {
  CmsAbout,
  CmsCompany,
  CmsContact,
  CmsFaqSection,
  CmsHomepage,
  CmsInsight,
  CmsPartner,
  CmsProject,
  CmsResources,
  CmsSeoEntry,
  CmsServices,
  CmsTrainingCourse,
  CmsTrainingPage,
} from "../lib/cms/types";
import { corsHeaders, json, type Env } from "../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  try {
    const [
      projects,
      training,
      faq,
      company,
      insights,
      about,
      homepage,
      seo,
      services,
      partners,
      contact,
      resources,
      trainingPage,
    ] = await Promise.all([
      getCmsCollection<CmsProject[]>(env, "projects"),
      getCmsCollection<CmsTrainingCourse[]>(env, "training"),
      getCmsCollection<CmsFaqSection[]>(env, "faq"),
      getCmsCollection<CmsCompany>(env, "company"),
      getCmsCollection<CmsInsight[]>(env, "insights"),
      getCmsCollection<CmsAbout>(env, "about"),
      getCmsCollection<CmsHomepage>(env, "homepage"),
      getCmsCollection<CmsSeoEntry[]>(env, "seo"),
      getCmsCollection<CmsServices>(env, "services"),
      getCmsCollection<CmsPartner[]>(env, "partners"),
      getCmsCollection<CmsContact>(env, "contact"),
      getCmsCollection<CmsResources>(env, "resources"),
      getCmsCollection<CmsTrainingPage>(env, "training-page"),
    ]);

    return json(
      {
        projects: projects?.filter((p) => p.published) ?? null,
        training: training?.filter((c) => c.published) ?? null,
        faq,
        company,
        insights: insights?.filter((i) => i.published) ?? null,
        about,
        homepage,
        seo,
        services,
        partners: partners?.filter((p) => p.published) ?? null,
        contact,
        resources,
        trainingPage,
      },
      200,
      {
        ...corsHeaders(request),
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      }
    );
  } catch {
    return json(
      {
        projects: null,
        training: null,
        faq: null,
        company: null,
        insights: null,
        about: null,
        homepage: null,
        seo: null,
        services: null,
        partners: null,
        contact: null,
        resources: null,
        trainingPage: null,
      },
      200,
      corsHeaders(request)
    );
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

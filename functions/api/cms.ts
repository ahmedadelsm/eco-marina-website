import { getCmsCollection } from "../lib/cms/storage";
import type {
  CmsAbout,
  CmsCompany,
  CmsFaqSection,
  CmsHomepage,
  CmsInsight,
  CmsProject,
  CmsSeoEntry,
  CmsServices,
  CmsTrainingCourse,
} from "../lib/cms/types";
import { corsHeaders, json, type Env } from "../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  try {
    const [projects, training, faq, company, insights, about, homepage, seo, services] = await Promise.all([
      getCmsCollection<CmsProject[]>(env, "projects"),
      getCmsCollection<CmsTrainingCourse[]>(env, "training"),
      getCmsCollection<CmsFaqSection[]>(env, "faq"),
      getCmsCollection<CmsCompany>(env, "company"),
      getCmsCollection<CmsInsight[]>(env, "insights"),
      getCmsCollection<CmsAbout>(env, "about"),
      getCmsCollection<CmsHomepage>(env, "homepage"),
      getCmsCollection<CmsSeoEntry[]>(env, "seo"),
      getCmsCollection<CmsServices>(env, "services"),
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
      },
      200,
      corsHeaders(request)
    );
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

import { getCmsCollection } from "../lib/cms/storage";
import type { CmsCompany, CmsFaqSection, CmsProject, CmsTrainingCourse } from "../lib/cms/types";
import { corsHeaders, json, type Env } from "../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  try {
    const [projects, training, faq, company] = await Promise.all([
      getCmsCollection<CmsProject[]>(env, "projects"),
      getCmsCollection<CmsTrainingCourse[]>(env, "training"),
      getCmsCollection<CmsFaqSection[]>(env, "faq"),
      getCmsCollection<CmsCompany>(env, "company"),
    ]);

    const publicProjects = projects?.filter((p) => p.published) ?? null;
    const publicTraining = training?.filter((c) => c.published) ?? null;

    return json(
      {
        projects: publicProjects,
        training: publicTraining,
        faq,
        company,
      },
      200,
      {
        ...corsHeaders(request),
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      }
    );
  } catch {
    return json({ projects: null, training: null, faq: null, company: null }, 200, corsHeaders(request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

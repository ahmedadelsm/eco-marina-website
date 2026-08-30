import { corsHeaders, json, requireAdmin, type Env } from "../../lib/utils";

const CMS_KEYS = [
  "cms.projects",
  "cms.training",
  "cms.faq",
  "cms.company",
  "cms.insights",
  "cms.about",
  "cms.homepage",
  "cms.seo",
  "cms.services",
  "cms.partners",
  "cms.contact",
  "cms.resources",
  "cms.training-page",
  "cms.hero",
  "cms.pages",
  "cms.navigation",
];

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const unread = await env.DB.prepare("SELECT COUNT(*) as count FROM messages WHERE read = 0").first<{ count: number }>();
  const total = await env.DB.prepare("SELECT COUNT(*) as count FROM messages").first<{ count: number }>();
  const maintenance = await env.SETTINGS.get("maintenance_mode");
  const contentCount = await env.DB.prepare("SELECT COUNT(*) as count FROM content").first<{ count: number }>();

  let cmsCollections = 0;
  for (const key of CMS_KEYS) {
    const row = await env.DB.prepare("SELECT 1 FROM content WHERE key = ?").bind(key).first();
    if (row) cmsCollections += 1;
  }

  return json(
    {
      unreadMessages: unread?.count ?? 0,
      totalMessages: total?.count ?? 0,
      contentOverrides: contentCount?.count ?? 0,
      cmsCollections,
      maintenanceEnabled: maintenance !== "false",
    },
    200,
    corsHeaders(request)
  );
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

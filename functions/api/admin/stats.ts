import { corsHeaders, json, requireAdmin, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const unread = await env.DB.prepare("SELECT COUNT(*) as count FROM messages WHERE read = 0").first<{ count: number }>();
  const total = await env.DB.prepare("SELECT COUNT(*) as count FROM messages").first<{ count: number }>();
  const maintenance = await env.SETTINGS.get("maintenance_mode");
  const contentCount = await env.DB.prepare("SELECT COUNT(*) as count FROM content").first<{ count: number }>();

  return json(
    {
      unreadMessages: unread?.count ?? 0,
      totalMessages: total?.count ?? 0,
      contentOverrides: contentCount?.count ?? 0,
      maintenanceEnabled: maintenance !== "false",
    },
    200,
    corsHeaders(context.request)
  );
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

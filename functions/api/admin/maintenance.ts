import { corsHeaders, json, requireAdmin, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const mode = await env.SETTINGS.get("maintenance_mode");
  return json({ enabled: mode !== "false" }, 200, corsHeaders());
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  try {
    const body = (await request.json()) as { enabled?: boolean };
    await env.SETTINGS.put("maintenance_mode", body.enabled ? "true" : "false");
    return json({ enabled: body.enabled ?? false }, 200, corsHeaders());
  } catch {
    return json({ error: "Failed to update" }, 500, corsHeaders());
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

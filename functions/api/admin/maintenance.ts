import { auditLog } from "../../lib/audit";
import { corsHeaders, json, readSession, requireAdmin, requireSuperAdmin, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const mode = await env.SETTINGS.get("maintenance_mode");
  return json({ enabled: mode !== "false" }, 200, corsHeaders(context.request));
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireSuperAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(context.request));

  try {
    const body = (await request.json()) as { enabled?: boolean };
    const enabled = body.enabled ?? false;
    await env.SETTINGS.put("maintenance_mode", enabled ? "true" : "false");
    await auditLog(env, admin, enabled ? "maintenance.enable" : "maintenance.disable");
    return json({ enabled }, 200, corsHeaders(context.request));
  } catch {
    return json({ error: "Failed to update" }, 500, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

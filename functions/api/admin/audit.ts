import { readAuditLog } from "../../lib/audit";
import { corsHeaders, json, requireSuperAdmin, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireSuperAdmin(request, env);
  if (denied) return denied;

  const entries = await readAuditLog(env);
  return json({ entries }, 200, corsHeaders(context.request));
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

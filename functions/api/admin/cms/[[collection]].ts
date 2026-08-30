import { auditLog } from "../../../lib/audit";
import { getCmsCollection, setCmsCollection } from "../../../lib/cms/storage";
import { CMS_COLLECTIONS, type CmsCollection } from "../../../lib/cms/types";
import { corsHeaders, json, readSession, requireAdmin, type Env } from "../../../lib/utils";

function parseCollection(raw: string | string[] | undefined): CmsCollection | null {
  const name = Array.isArray(raw) ? raw[0] : raw;
  if (!name || !CMS_COLLECTIONS.has(name as CmsCollection)) return null;
  return name as CmsCollection;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const collection = parseCollection(params.collection);
  if (!collection) return json({ error: "Unknown collection" }, 404, corsHeaders(request));

  const data = await getCmsCollection(env, collection);
  return json({ collection, data }, 200, corsHeaders(request));
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));

  const collection = parseCollection(params.collection);
  if (!collection) return json({ error: "Unknown collection" }, 404, corsHeaders(request));

  try {
    const body = (await request.json()) as { data?: unknown };
    if (body.data === undefined) {
      return json({ error: "Missing data" }, 400, corsHeaders(request));
    }
    await setCmsCollection(env, collection, body.data);
    await auditLog(env, admin, "cms.update", collection);
    return json({ ok: true, collection }, 200, corsHeaders(request));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return json({ error: message }, 400, corsHeaders(request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

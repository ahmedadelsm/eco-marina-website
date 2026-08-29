import { auditLog } from "../../lib/audit";
import { isEditableContentKey } from "../../lib/content-keys";
import { corsHeaders, json, readSession, requireAdmin, type Env } from "../../lib/utils";

const MAX_VALUE_LENGTH = 10_000;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const { results } = await env.DB.prepare("SELECT key, value, updated_at FROM content ORDER BY key").all();
  return json({ content: results }, 200, corsHeaders(context.request));
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));

  try {
    const body = (await request.json()) as { key?: string; value?: unknown };
    const key = body.key?.trim();

    if (!key || body.value === undefined) {
      return json({ error: "Missing key or value" }, 400, corsHeaders(context.request));
    }

    if (!isEditableContentKey(key)) {
      return json({ error: "This content key cannot be edited" }, 400, corsHeaders(context.request));
    }

    const value = typeof body.value === "string" ? body.value : JSON.stringify(body.value);
    if (value.length > MAX_VALUE_LENGTH) {
      return json({ error: "Value is too long" }, 400, corsHeaders(context.request));
    }

    await env.DB.prepare(
      `INSERT INTO content (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )
      .bind(key, value)
      .run();

    await auditLog(env, admin, "content.update", key);

    return json({ ok: true }, 200, corsHeaders(context.request));
  } catch {
    return json({ error: "Save failed" }, 500, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

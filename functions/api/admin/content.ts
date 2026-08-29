import { corsHeaders, json, requireAdmin, type Env } from "../../lib/utils";

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

  try {
    const body = (await request.json()) as { key?: string; value?: unknown };
    if (!body.key || body.value === undefined) {
      return json({ error: "Missing key or value" }, 400, corsHeaders(context.request));
    }

    const value = typeof body.value === "string" ? body.value : JSON.stringify(body.value);
    await env.DB.prepare(
      `INSERT INTO content (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )
      .bind(body.key, value)
      .run();

    return json({ ok: true }, 200, corsHeaders(context.request));
  } catch {
    return json({ error: "Save failed" }, 500, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

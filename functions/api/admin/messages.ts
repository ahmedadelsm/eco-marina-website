import { auditLog } from "../../lib/audit";
import { corsHeaders, json, readSession, requireAdmin, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, first_name, last_name, email, organization, service_type, message, read, created_at FROM messages ORDER BY created_at DESC LIMIT 200"
    ).all();

    const unread = await env.DB.prepare("SELECT COUNT(*) as count FROM messages WHERE read = 0").first<{ count: number }>();

    return json({ messages: results, unread: unread?.count ?? 0 }, 200, corsHeaders(context.request));
  } catch {
    return json({ error: "Failed to load messages" }, 500, corsHeaders(context.request));
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  try {
    const body = (await request.json()) as { id?: number; read?: boolean };
    if (!body.id) return json({ error: "Missing id" }, 400, corsHeaders(context.request));

    await env.DB.prepare("UPDATE messages SET read = ? WHERE id = ?")
      .bind(body.read ? 1 : 0, body.id)
      .run();

    return json({ ok: true }, 200, corsHeaders(context.request));
  } catch {
    return json({ error: "Update failed" }, 500, corsHeaders(context.request));
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(context.request));

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "Missing id" }, 400, corsHeaders(context.request));

  await env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(Number(id)).run();
  await auditLog(env, admin, "message.delete", id);
  return json({ ok: true }, 200, corsHeaders(context.request));
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

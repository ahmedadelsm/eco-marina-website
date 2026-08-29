import { corsHeaders, json, readSession, requireAdmin, type Env } from "../../lib/utils";
import { hashPassword } from "../../lib/password";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const { results } = await env.DB.prepare(
    "SELECT id, email, name, active, created_at FROM admins ORDER BY created_at ASC"
  ).all();

  return json({ admins: results }, 200, corsHeaders(context.request));
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  try {
    const body = (await request.json()) as { email?: string; password?: string; name?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const name = body.name?.trim() || null;

    if (!email || !password || password.length < 8) {
      return json({ error: "Email and password (min 8 chars) required" }, 400, corsHeaders(context.request));
    }

    const passwordHash = await hashPassword(password);
    await env.DB.prepare(
      "INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)"
    )
      .bind(email, passwordHash, name)
      .run();

    return json({ ok: true }, 201, corsHeaders(context.request));
  } catch {
    return json({ error: "Email may already exist" }, 409, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

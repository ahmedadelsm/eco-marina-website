import { corsHeaders, createSession, json, sessionCookie, type Env } from "../../lib/utils";
import { verifyPassword } from "../../lib/password";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return json({ error: "Email and password required" }, 400, corsHeaders());
    }

    const admin = await env.DB.prepare(
      "SELECT id, email, password_hash, name FROM admins WHERE email = ? AND active = 1"
    )
      .bind(email)
      .first<{ id: number; email: string; password_hash: string; name: string | null }>();

    if (!admin || !(await verifyPassword(password, admin.password_hash))) {
      return json({ error: "Invalid email or password" }, 401, corsHeaders());
    }

    const sessionId = await createSession(env, { id: admin.id, email: admin.email });
    return json({ ok: true, email: admin.email, name: admin.name }, 200, {
      ...corsHeaders(),
      "Set-Cookie": sessionCookie(sessionId),
    });
  } catch {
    return json({ error: "Login failed" }, 500, corsHeaders());
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

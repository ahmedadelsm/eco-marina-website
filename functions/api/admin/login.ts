import { auditLog } from "../../lib/audit";
import { enforceRateLimit } from "../../lib/rate-limit";
import { isTurnstileEnabled, verifyTurnstile } from "../../lib/turnstile";
import { corsHeaders, createSession, json, sessionCookie, type AdminRole, type Env } from "../../lib/utils";
import { verifyPassword } from "../../lib/password";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cors = corsHeaders(request);

  const limited = await enforceRateLimit(request, env, "login", 5, 900);
  if (limited) return limited;

  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      turnstileToken?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return json({ error: "Email and password required" }, 400, cors);
    }

    if (isTurnstileEnabled(env)) {
      const ok = await verifyTurnstile(request, env, body.turnstileToken);
      if (!ok) return json({ error: "Captcha verification failed" }, 400, cors);
    }

    if (password.length > 256) {
      return json({ error: "Invalid email or password" }, 401, cors);
    }

    const admin = await env.DB.prepare(
      "SELECT id, email, password_hash, name, role FROM admins WHERE email = ? AND active = 1"
    )
      .bind(email)
      .first<{
        id: number;
        email: string;
        password_hash: string;
        name: string | null;
        role: string;
      }>();

    if (!admin || !(await verifyPassword(password, admin.password_hash))) {
      return json({ error: "Invalid email or password" }, 401, cors);
    }

    const role: AdminRole = admin.role === "super_admin" ? "super_admin" : "editor";
    const sessionId = await createSession(env, {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role,
    });

    await auditLog(env, admin, "login");

    return json({ ok: true, email: admin.email, name: admin.name, role }, 200, {
      ...cors,
      "Set-Cookie": sessionCookie(sessionId),
    });
  } catch {
    return json({ error: "Login failed" }, 500, cors);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

import { corsHeaders, createSession, json, sessionCookie, type Env } from "../../lib/utils";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const password = env.ADMIN_PASSWORD;

  if (!password) {
    return json({ error: "Admin not configured. Set ADMIN_PASSWORD in Cloudflare." }, 503);
  }

  try {
    const body = (await request.json()) as { password?: string };
    if (body.password !== password) {
      return json({ error: "Invalid password" }, 401, corsHeaders());
    }

    const sessionId = await createSession(env);
    return json({ ok: true }, 200, {
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

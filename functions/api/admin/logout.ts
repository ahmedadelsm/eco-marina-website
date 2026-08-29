import { clearSessionCookies, corsHeaders, getSessionIdFromCookie, type Env } from "../../lib/utils";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cors = corsHeaders(request);

  const sessionId = getSessionIdFromCookie(request);
  if (sessionId) {
    await env.SETTINGS.delete(`session:${sessionId}`);
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    ...cors,
  });
  for (const cookie of clearSessionCookies()) {
    headers.append("Set-Cookie", cookie);
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

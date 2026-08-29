import { clearSessionCookie, corsHeaders, json, type Env } from "../../lib/utils";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const cors = corsHeaders(context.request);
  return json({ ok: true }, 200, {
    ...cors,
    "Set-Cookie": clearSessionCookie(),
  });
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

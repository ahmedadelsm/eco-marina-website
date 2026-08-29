import { corsHeaders, json, readSession, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cors = corsHeaders(request);
  const admin = await readSession(request, env);

  if (!admin) {
    return json({ error: "Unauthorized" }, 401, cors);
  }

  return json(
    {
      email: admin.email,
      name: admin.name ?? null,
      id: admin.id,
      role: admin.role,
    },
    200,
    cors
  );
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

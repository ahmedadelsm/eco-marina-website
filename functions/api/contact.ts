import { corsHeaders, json, type Env } from "../lib/utils";

interface ContactBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: string;
  serviceType?: string;
  message?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = (await request.json()) as ContactBody;
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!firstName || !lastName || !email || !message) {
      return json({ error: "Missing required fields" }, 400, corsHeaders(context.request));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email" }, 400, corsHeaders(context.request));
    }

    await env.DB.prepare(
      `INSERT INTO messages (first_name, last_name, email, organization, service_type, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(
        firstName,
        lastName,
        email,
        body.organization?.trim() || null,
        body.serviceType?.trim() || null,
        message
      )
      .run();

    return json({ ok: true }, 201, corsHeaders(context.request));
  } catch {
    return json({ error: "Failed to submit message" }, 500, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

import { notifyContactSubmission } from "../lib/notify-contact";
import { enforceRateLimit } from "../lib/rate-limit";
import { isTurnstileEnabled, verifyTurnstile } from "../lib/turnstile";
import { corsHeaders, json, type Env } from "../lib/utils";

interface ContactBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: string;
  serviceType?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
}

const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  organization: 200,
  serviceType: 100,
  message: 5000,
} as const;

function trimField(value: unknown, max: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cors = corsHeaders(request);

  const limited = await enforceRateLimit(request, env, "contact", 5, 3600);
  if (limited) return limited;

  try {
    const body = (await request.json()) as ContactBody;

    if (body.website?.trim()) {
      return json({ ok: true }, 201, cors);
    }

    if (isTurnstileEnabled(env)) {
      const ok = await verifyTurnstile(request, env, body.turnstileToken);
      if (!ok) return json({ error: "Captcha verification failed" }, 400, cors);
    }

    const firstName = trimField(body.firstName, LIMITS.firstName);
    const lastName = trimField(body.lastName, LIMITS.lastName);
    const email = trimField(body.email, LIMITS.email);
    const message = trimField(body.message, LIMITS.message);
    const organization = trimField(body.organization, LIMITS.organization) || null;
    const serviceType = trimField(body.serviceType, LIMITS.serviceType) || null;

    if (!firstName || !lastName || !email || !message) {
      return json({ error: "Missing required fields" }, 400, cors);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email" }, 400, cors);
    }

    await env.DB.prepare(
      `INSERT INTO messages (first_name, last_name, email, organization, service_type, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(firstName, lastName, email, organization, serviceType, message)
      .run();

    context.waitUntil(
      notifyContactSubmission(env, {
        firstName,
        lastName,
        email,
        organization,
        serviceType,
        message,
      })
    );

    return json({ ok: true }, 201, cors);
  } catch {
    return json({ error: "Failed to submit message" }, 500, cors);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

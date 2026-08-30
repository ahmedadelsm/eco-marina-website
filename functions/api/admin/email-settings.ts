import { auditLog } from "../../lib/audit";
import {
  getEmailSettings,
  isEmailProviderConfigured,
  isZohoConfigured,
  isResendConfigured,
  saveEmailSettings,
} from "../../lib/email-settings";
import { sendTestEmail } from "../../lib/send-email";
import { corsHeaders, json, readSession, requireAdmin, requireSuperAdmin, type Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const settings = await getEmailSettings(env);
  return json(
    {
      ...settings,
      provider: isZohoConfigured(env) ? "zoho" : isResendConfigured(env) ? "resend" : null,
      providerConfigured: isEmailProviderConfigured(env),
    },
    200,
    corsHeaders(context.request)
  );
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireSuperAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(context.request));

  try {
    const body = (await request.json()) as {
      enabled?: boolean;
      notifyEmail?: string;
      fromEmail?: string;
      fromName?: string;
    };
    const settings = await saveEmailSettings(env, body);
    await auditLog(env, admin, "email.settings.update", settings.notifyEmail);
    return json(
      {
        ...settings,
        provider: isZohoConfigured(env) ? "zoho" : isResendConfigured(env) ? "resend" : null,
        providerConfigured: isEmailProviderConfigured(env),
      },
      200,
      corsHeaders(context.request)
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update email settings";
    return json({ error: message }, 400, corsHeaders(context.request));
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireSuperAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(context.request));

  try {
    await sendTestEmail(env);
    await auditLog(env, admin, "email.test.send");
    return json({ ok: true }, 200, corsHeaders(context.request));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Test email failed";
    return json({ error: message }, 400, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

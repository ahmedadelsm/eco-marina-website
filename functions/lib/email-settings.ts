import type { Env } from "./utils";

export interface EmailSettings {
  enabled: boolean;
  notifyEmail: string;
  fromEmail: string;
  fromName: string;
}

const KV_KEY = "email_settings";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function envDefaults(env: Env): EmailSettings {
  const fromRaw = env.CONTACT_FROM_EMAIL?.trim() || "";
  const fromMatch = fromRaw.match(/^(.+?)\s*<([^>]+)>$/);
  return {
    enabled: true,
    notifyEmail: env.CONTACT_NOTIFY_EMAIL?.trim() || "info@eco-marina.com",
    fromEmail: fromMatch?.[2]?.trim() || fromRaw || "info@eco-marina.com",
    fromName: fromMatch?.[1]?.trim() || "Eco Marina",
  };
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value) && value.length <= 254;
}

export async function getEmailSettings(env: Env): Promise<EmailSettings> {
  const defaults = envDefaults(env);
  const raw = await env.SETTINGS.get(KV_KEY);
  if (!raw) return defaults;

  try {
    const parsed = JSON.parse(raw) as Partial<EmailSettings>;
    return {
      enabled: parsed.enabled ?? defaults.enabled,
      notifyEmail: parsed.notifyEmail?.trim() || defaults.notifyEmail,
      fromEmail: parsed.fromEmail?.trim() || defaults.fromEmail,
      fromName: parsed.fromName?.trim() || defaults.fromName,
    };
  } catch {
    return defaults;
  }
}

export async function saveEmailSettings(env: Env, input: Partial<EmailSettings>): Promise<EmailSettings> {
  const current = await getEmailSettings(env);
  const next: EmailSettings = {
    enabled: input.enabled ?? current.enabled,
    notifyEmail: input.notifyEmail?.trim() || current.notifyEmail,
    fromEmail: input.fromEmail?.trim() || current.fromEmail,
    fromName: input.fromName?.trim() || current.fromName,
  };

  if (!isValidEmail(next.notifyEmail) || !isValidEmail(next.fromEmail)) {
    throw new Error("Invalid email address");
  }

  if (next.fromName.length > 100) {
    throw new Error("From name is too long");
  }

  await env.SETTINGS.put(KV_KEY, JSON.stringify(next));
  return next;
}

export function isZohoConfigured(env: Env): boolean {
  return Boolean(
    env.ZOHO_CLIENT_ID?.trim() &&
      env.ZOHO_CLIENT_SECRET?.trim() &&
      env.ZOHO_REFRESH_TOKEN?.trim()
  );
}

export function isResendConfigured(env: Env): boolean {
  return Boolean(env.RESEND_API_KEY?.trim());
}

export function isEmailProviderConfigured(env: Env): boolean {
  return isZohoConfigured(env) || isResendConfigured(env);
}

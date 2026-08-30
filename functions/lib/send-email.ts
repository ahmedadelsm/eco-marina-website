import {
  getEmailSettings,
  isEmailProviderConfigured,
  isResendConfigured,
  isZohoConfigured,
  type EmailSettings,
} from "./email-settings";
import { sendZohoMail } from "./zoho-mail";
import type { Env } from "./utils";

export interface ContactEmailPayload {
  firstName: string;
  lastName: string;
  email: string;
  organization: string | null;
  serviceType: string | null;
  message: string;
}

function buildContactText(msg: ContactEmailPayload): string {
  return [
    `Name: ${msg.firstName} ${msg.lastName}`,
    `Email: ${msg.email}`,
    msg.organization ? `Organization: ${msg.organization}` : null,
    msg.serviceType ? `Service: ${msg.serviceType}` : null,
    "",
    msg.message,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendViaResend(env: Env, settings: EmailSettings, subject: string, text: string, replyTo?: string): Promise<void> {
  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("Resend is not configured");

  const from = `${settings.fromName} <${settings.fromEmail}>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [settings.notifyEmail],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  }
}

export async function sendContactNotification(env: Env, msg: ContactEmailPayload): Promise<void> {
  const settings = await getEmailSettings(env);
  if (!settings.enabled) return;
  if (!isEmailProviderConfigured(env)) return;

  const subject = `New contact: ${msg.firstName} ${msg.lastName}`;
  const text = buildContactText(msg);

  if (isZohoConfigured(env)) {
    await sendZohoMail(env, {
      to: settings.notifyEmail,
      fromEmail: settings.fromEmail,
      fromName: settings.fromName,
      replyTo: msg.email,
      subject,
      text,
    });
    return;
  }

  await sendViaResend(env, settings, subject, text, msg.email);
}

export async function sendTestEmail(env: Env): Promise<void> {
  const settings = await getEmailSettings(env);
  if (!settings.enabled) {
    throw new Error("Email notifications are turned off");
  }
  if (!isEmailProviderConfigured(env)) {
    throw new Error("Email provider is not configured in Cloudflare");
  }

  const subject = "Eco Marina — test email";
  const text = "This is a test message from the Eco Marina admin panel. Contact form notifications are working.";

  if (isZohoConfigured(env)) {
    await sendZohoMail(env, {
      to: settings.notifyEmail,
      fromEmail: settings.fromEmail,
      fromName: settings.fromName,
      subject,
      text,
    });
    return;
  }

  await sendViaResend(env, settings, subject, text);
}

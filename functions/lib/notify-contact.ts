import type { Env } from "./utils";

interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  organization: string | null;
  serviceType: string | null;
  message: string;
}

export async function notifyContactSubmission(env: Env, msg: ContactMessage): Promise<void> {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_NOTIFY_EMAIL?.trim();
  if (!apiKey || !to) return;

  const from = env.CONTACT_FROM_EMAIL?.trim() || "Eco Marina Website <onboarding@resend.dev>";
  const subject = `New contact: ${msg.firstName} ${msg.lastName}`;
  const text = [
    `Name: ${msg.firstName} ${msg.lastName}`,
    `Email: ${msg.email}`,
    msg.organization ? `Organization: ${msg.organization}` : null,
    msg.serviceType ? `Service: ${msg.serviceType}` : null,
    "",
    msg.message,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: msg.email, subject, text }),
  });

  if (!res.ok) {
    console.error("Contact notification failed:", res.status, await res.text());
  }
}

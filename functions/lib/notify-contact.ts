import { sendContactNotification, type ContactEmailPayload } from "./send-email";

export type { ContactEmailPayload };

export async function notifyContactSubmission(env: Parameters<typeof sendContactNotification>[0], msg: ContactEmailPayload): Promise<void> {
  try {
    await sendContactNotification(env, msg);
  } catch (err) {
    console.error("Contact notification failed:", err);
  }
}

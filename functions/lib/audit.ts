import type { Env } from "./utils";

const MAX_ENTRIES = 100;

export async function auditLog(
  env: Env,
  admin: { id: number; email: string },
  action: string,
  detail?: string
): Promise<void> {
  try {
    const raw = await env.SETTINGS.get("audit:log");
    const entries = raw ? (JSON.parse(raw) as unknown[]) : [];
    entries.unshift({
      at: new Date().toISOString(),
      adminId: admin.id,
      email: admin.email,
      action,
      detail: detail ?? null,
    });
    await env.SETTINGS.put("audit:log", JSON.stringify(entries.slice(0, MAX_ENTRIES)));
  } catch {
    // Audit failure must not block the request.
  }
}

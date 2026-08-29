import type { Env } from "./utils";

const MAX_ENTRIES = 100;

export interface AuditEntry {
  at: string;
  adminId: number;
  email: string;
  action: string;
  detail: string | null;
}

export async function readAuditLog(env: Env): Promise<AuditEntry[]> {
  try {
    const raw = await env.SETTINGS.get("audit:log");
    if (!raw) return [];
    const entries = JSON.parse(raw) as AuditEntry[];
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

export async function auditLog(
  env: Env,
  admin: { id: number; email: string },
  action: string,
  detail?: string
): Promise<void> {
  try {
    const entries = await readAuditLog(env);
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

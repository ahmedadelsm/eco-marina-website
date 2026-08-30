import type { Env } from "./utils";

const MAX_ENTRIES = 500;

export interface AuditEntry {
  at: string;
  adminId: number;
  email: string;
  action: string;
  detail: string | null;
}

async function readFromD1(env: Env): Promise<AuditEntry[]> {
  try {
    const { results } = await env.DB.prepare(
      "SELECT admin_id, email, action, detail, created_at FROM audit_log ORDER BY created_at DESC LIMIT ?"
    )
      .bind(MAX_ENTRIES)
      .all();
    return (results as { admin_id: number; email: string; action: string; detail: string | null; created_at: string }[]).map(
      (row) => ({
        at: row.created_at,
        adminId: row.admin_id,
        email: row.email,
        action: row.action,
        detail: row.detail,
      })
    );
  } catch {
    return [];
  }
}

export async function readAuditLog(env: Env): Promise<AuditEntry[]> {
  const d1 = await readFromD1(env);
  if (d1.length > 0) return d1;

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
    await env.DB.prepare(
      "INSERT INTO audit_log (admin_id, email, action, detail) VALUES (?, ?, ?, ?)"
    )
      .bind(admin.id, admin.email, action, detail ?? null)
      .run();
  } catch {
    try {
      const entries = await readAuditLog(env);
      entries.unshift({
        at: new Date().toISOString(),
        adminId: admin.id,
        email: admin.email,
        action,
        detail: detail ?? null,
      });
      await env.SETTINGS.put("audit:log", JSON.stringify(entries.slice(0, 100)));
    } catch {
      // Audit failure must not block the request.
    }
  }
}

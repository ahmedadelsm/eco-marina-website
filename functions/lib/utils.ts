export interface Env {
  DB: D1Database;
  SETTINGS: KVNamespace;
  ADMIN_PASSWORD?: string;
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_DC?: string;
  ZOHO_ACCOUNT_ID?: string;
  MEDIA?: R2Bucket;
}

export type AdminRole = "super_admin" | "editor";

export interface AdminSession {
  id: number;
  email: string;
  name?: string | null;
  role: AdminRole;
  sessionEpoch: number;
}

const ALLOWED_ORIGINS = new Set([
  "https://eco-marina.com",
  "https://www.eco-marina.com",
]);

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/** CORS headers that work with credentials (cookies) across www and apex. */
export function corsHeaders(request?: Request): Record<string, string> {
  const origin = request?.headers.get("Origin") ?? "";
  if (ALLOWED_ORIGINS.has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      Vary: "Origin",
    };
  }
  return {};
}

async function getAdminSessionEpoch(env: Env, adminId: number): Promise<number> {
  const raw = await env.SETTINGS.get(`admin:${adminId}:session_epoch`);
  return raw ? parseInt(raw, 10) : 0;
}

export async function bumpAdminSessionEpoch(env: Env, adminId: number): Promise<void> {
  const epoch = (await getAdminSessionEpoch(env, adminId)) + 1;
  await env.SETTINGS.put(`admin:${adminId}:session_epoch`, String(epoch));
}

function normalizeRole(role: string | null | undefined): AdminRole {
  return role === "super_admin" ? "super_admin" : "editor";
}

export async function readSession(request: Request, env: Env): Promise<AdminSession | null> {
  const sessionId = getSessionIdFromCookie(request);
  if (!sessionId) return null;

  const raw = await env.SETTINGS.get(`session:${sessionId}`);
  if (!raw) return null;

  let session: { id: number; email: string; name?: string | null; sessionEpoch?: number };
  try {
    session = JSON.parse(raw) as typeof session;
  } catch {
    return null;
  }

  const admin = await env.DB.prepare(
    "SELECT id, email, name, active, role FROM admins WHERE id = ?"
  )
    .bind(session.id)
    .first<{ id: number; email: string; name: string | null; active: number; role: string }>();

  if (!admin || admin.active !== 1) {
    await env.SETTINGS.delete(`session:${sessionId}`);
    return null;
  }

  const currentEpoch = await getAdminSessionEpoch(env, admin.id);
  if ((session.sessionEpoch ?? 0) !== currentEpoch) {
    await env.SETTINGS.delete(`session:${sessionId}`);
    return null;
  }

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: normalizeRole(admin.role),
    sessionEpoch: currentEpoch,
  };
}

export function getSessionIdFromCookie(request: Request): string | null {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/admin_session=([^;]+)/);
  const value = match?.[1]?.trim();
  return value || null;
}

export async function createSession(
  env: Env,
  admin: { id: number; email: string; name?: string | null; role: AdminRole }
): Promise<string> {
  const id = crypto.randomUUID();
  const sessionEpoch = await getAdminSessionEpoch(env, admin.id);
  await env.SETTINGS.put(
    `session:${id}`,
    JSON.stringify({ ...admin, sessionEpoch }),
    { expirationTtl: 86400 * 7 }
  );
  return id;
}

export function sessionCookie(sessionId: string) {
  return `admin_session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Domain=.eco-marina.com; Max-Age=${86400 * 7}`;
}

export function clearSessionCookie() {
  return clearSessionCookies()[0];
}

/** Clear domain + host-only cookies so logout works on apex and www. */
export function clearSessionCookies(): string[] {
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const base = `admin_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0; Expires=${expires}`;
  return [`${base}; Domain=.eco-marina.com`, base];
}

export async function requireAdmin(request: Request, env: Env): Promise<Response | null> {
  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));
  return null;
}

export async function requireSuperAdmin(request: Request, env: Env): Promise<Response | null> {
  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));
  if (admin.role !== "super_admin") {
    return json({ error: "Forbidden" }, 403, corsHeaders(request));
  }
  return null;
}

export async function getAdminOrNull(request: Request, env: Env): Promise<AdminSession | null> {
  return readSession(request, env);
}

export function isSuperAdmin(admin: AdminSession): boolean {
  return admin.role === "super_admin";
}

export interface Env {
  DB: D1Database;
  SETTINGS: KVNamespace;
  ADMIN_PASSWORD?: string;
  ASSETS: { fetch: (req: Request) => Promise<Response> };
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

export async function readSession(request: Request, env: Env): Promise<{ id: number; email: string; name?: string | null } | null> {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/admin_session=([^;]+)/);
  if (!match) return null;
  const raw = await env.SETTINGS.get(`session:${match[1]}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { id: number; email: string; name?: string | null };
  } catch {
    return null;
  }
}

export async function createSession(
  env: Env,
  admin: { id: number; email: string; name?: string | null }
): Promise<string> {
  const id = crypto.randomUUID();
  await env.SETTINGS.put(`session:${id}`, JSON.stringify(admin), { expirationTtl: 86400 * 7 });
  return id;
}

export function sessionCookie(sessionId: string) {
  return `admin_session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Domain=.eco-marina.com; Max-Age=${86400 * 7}`;
}

export function clearSessionCookie() {
  return `admin_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Domain=.eco-marina.com; Max-Age=0`;
}

export async function requireAdmin(request: Request, env: Env): Promise<Response | null> {
  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));
  return null;
}

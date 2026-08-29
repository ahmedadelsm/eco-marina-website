export interface Env {
  DB: D1Database;
  SETTINGS: KVNamespace;
  ADMIN_PASSWORD?: string;
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function readSession(request: Request, env: Env): Promise<{ id: number; email: string } | null> {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/admin_session=([^;]+)/);
  if (!match) return null;
  const raw = await env.SETTINGS.get(`session:${match[1]}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { id: number; email: string };
  } catch {
    return null;
  }
}

export async function createSession(env: Env, admin: { id: number; email: string }): Promise<string> {
  const id = crypto.randomUUID();
  await env.SETTINGS.put(`session:${id}`, JSON.stringify(admin), { expirationTtl: 86400 * 7 });
  return id;
}

export function sessionCookie(sessionId: string) {
  return `admin_session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${86400 * 7}`;
}

export async function requireAdmin(request: Request, env: Env): Promise<Response | null> {
  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401);
  return null;
}

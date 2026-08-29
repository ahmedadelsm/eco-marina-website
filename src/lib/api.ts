export const API = {
  contact: "/api/contact",
  content: "/api/content",
  admin: {
    login: "/api/admin/login",
    stats: "/api/admin/stats",
    messages: "/api/admin/messages",
    content: "/api/admin/content",
    maintenance: "/api/admin/maintenance",
    admins: "/api/admin/admins",
    me: "/api/admin/me",
    logout: "/api/admin/logout",
    password: "/api/admin/password",
    audit: "/api/admin/audit",
  },
} as const;

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  return parseJson<T>(res);
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<T>(res);
}

export async function apiPut<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<T>(res);
}

export async function apiPatch<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<T>(res);
}

export async function apiDelete<T>(url: string): Promise<T> {
  const res = await fetch(url, { method: "DELETE", credentials: "include" });
  return parseJson<T>(res);
}

export async function adminLogout(): Promise<void> {
  const res = await fetch(API.admin.logout, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok) throw new Error("Logout failed");
}

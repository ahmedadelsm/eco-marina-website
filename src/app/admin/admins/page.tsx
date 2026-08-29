"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet, apiPatch, apiPost } from "@/lib/api";

type Admin = { id: number; email: string; name: string | null; active: number; created_at: string };

export default function AdminUsersPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadAdmins() {
    const d = await apiGet<{ admins: Admin[] }>(API.admin.admins);
    setAdmins(d.admins as Admin[]);
  }

  useEffect(() => {
    Promise.all([
      apiGet<{ admins: Admin[] }>(API.admin.admins),
      apiGet<{ id: number }>(API.admin.me),
    ])
      .then(([adminsRes, meRes]) => {
        setAdmins(adminsRes.admins as Admin[]);
        setCurrentId(meRes.id);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function addAdmin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await apiPost(API.admin.admins, { email, name, password });
      setEmail("");
      setName("");
      setPassword("");
      setMessage("Admin added.");
      await loadAdmins();
    } catch {
      setError("Could not add admin — check email is unique and password is 8+ characters.");
    }
  }

  async function toggleActive(admin: Admin) {
    setMessage("");
    setError("");
    const nextActive = admin.active !== 1;
    try {
      await apiPatch(API.admin.admins, { id: admin.id, active: nextActive });
      setMessage(nextActive ? `Reactivated ${admin.email}.` : `Deactivated ${admin.email}.`);
      await loadAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update admin.");
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Admin users</h1>
      <p className="mt-2 text-ink-muted">Manage who can sign in to the admin panel.</p>

      <div className="mt-8 max-w-2xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Add admin</h2>
        <form onSubmit={addAdmin} className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="new-email">Email</label>
            <input id="new-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full border border-line px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="new-name">Name (optional)</label>
            <input id="new-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="new-password">Password</label>
            <input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="bg-sea px-4 py-2 text-sm font-semibold text-white hover:bg-sea-dark">Add admin</button>
        </form>
      </div>

      {message && <p className="mt-4 text-sm text-sea">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <ul className="mt-8 space-y-2">
        {admins.map((a) => (
          <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white px-4 py-3 text-sm">
            <div>
              <span className="font-medium text-ink">{a.email}</span>
              {a.name && <span className="text-ink-muted"> — {a.name}</span>}
              {a.active !== 1 && <span className="ml-2 text-xs uppercase tracking-wide text-amber-700">Inactive</span>}
              {a.id === currentId && <span className="ml-2 text-xs uppercase tracking-wide text-sea">You</span>}
            </div>
            {a.id !== currentId && (
              <button
                type="button"
                onClick={() => toggleActive(a)}
                className={`rounded border px-3 py-1 text-xs font-medium ${
                  a.active === 1
                    ? "border-red-200 text-red-700 hover:bg-red-50"
                    : "border-sea/30 text-sea hover:bg-sea-light"
                }`}
              >
                {a.active === 1 ? "Deactivate" : "Reactivate"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

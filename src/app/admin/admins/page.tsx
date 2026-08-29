"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet, apiPost } from "@/lib/api";

type Admin = { id: number; email: string; name: string | null; active: number; created_at: string };

export default function AdminUsersPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiGet<{ admins: Admin[] }>("/api/admin/admins")
      .then((d) => setAdmins(d.admins as Admin[]))
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function addAdmin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      await apiPost("/api/admin/admins", { email, name, password });
      setEmail("");
      setName("");
      setPassword("");
      setMessage("Admin added.");
      const d = await apiGet<{ admins: Admin[] }>("/api/admin/admins");
      setAdmins(d.admins as Admin[]);
    } catch {
      setMessage("Could not add admin — check email is unique and password is 8+ characters.");
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
          {message && <p className="text-sm text-sea">{message}</p>}
        </form>
      </div>

      <ul className="mt-8 space-y-2">
        {admins.map((a) => (
          <li key={a.id} className="border border-line bg-white px-4 py-3 text-sm">
            <span className="font-medium text-ink">{a.email}</span>
            {a.name && <span className="text-ink-muted"> — {a.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

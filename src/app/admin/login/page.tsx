"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet, apiPost } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet(API.admin.stats).then(() => router.replace("/admin")).catch(() => {});
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiPost(API.admin.login, { password });
      router.replace("/admin");
    } catch {
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-white/10 bg-white p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea">Eco Marina</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-ink">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink-muted">Manage content, messages, and maintenance mode.</p>
        <label className="mt-6 block text-sm font-medium text-ink" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
          required
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-sea py-3 text-sm font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

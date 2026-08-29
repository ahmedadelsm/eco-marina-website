"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTurnstileConfigured, TurnstileWidget } from "@/components/TurnstileWidget";
import { API, apiGet, apiPost } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  useEffect(() => {
    apiGet(API.admin.me).then(() => router.replace("/admin")).catch(() => {});
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isTurnstileConfigured() && !turnstileToken) {
      setError("Please complete the captcha.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await apiPost(API.admin.login, {
        email,
        password,
        ...(turnstileToken ? { turnstileToken } : {}),
      });
      router.replace("/admin");
    } catch {
      setError("Invalid email or password");
      setTurnstileToken("");
      setTurnstileReset((n) => n + 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-white/10 bg-white p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea">Eco Marina</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-ink">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink-muted">Sign in with your admin email and password.</p>

        <label className="mt-6 block text-sm font-medium text-ink" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
          required
          autoFocus
          autoComplete="email"
        />

        <label className="mt-4 block text-sm font-medium text-ink" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
          required
          autoComplete="current-password"
        />

        <TurnstileWidget
          onToken={handleTurnstileToken}
          onExpire={handleTurnstileExpire}
          resetKey={turnstileReset}
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

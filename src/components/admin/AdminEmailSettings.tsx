"use client";

import { useEffect, useState } from "react";
import { API, apiGet, apiPost, apiPut } from "@/lib/api";

type EmailSettingsResponse = {
  enabled: boolean;
  notifyEmail: string;
  fromEmail: string;
  fromName: string;
  provider: "zoho" | "resend" | null;
  providerConfigured: boolean;
};

export function AdminEmailSettings() {
  const [settings, setSettings] = useState<EmailSettingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiGet<EmailSettingsResponse>(API.admin.emailSettings)
      .then(setSettings)
      .catch(() => setError("Could not load email settings."))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const updated = await apiPut<EmailSettingsResponse>(API.admin.emailSettings, {
        enabled: settings.enabled,
        notifyEmail: settings.notifyEmail,
        fromEmail: settings.fromEmail,
        fromName: settings.fromName,
      });
      setSettings((prev) => (prev ? { ...prev, ...updated } : updated));
      setMessage("Email settings saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save email settings.");
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    setTesting(true);
    setError("");
    setMessage("");
    try {
      await apiPost(API.admin.emailSettings, {});
      setMessage(`Test email sent to ${settings?.notifyEmail}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Test email failed.");
    } finally {
      setTesting(false);
    }
  }

  if (loading) return <p className="text-sm text-ink-muted">Loading email settings…</p>;
  if (!settings) {
    return <p className="mt-8 text-sm text-red-600">{error || "Email settings unavailable."}</p>;
  }

  const providerLabel =
    settings.provider === "zoho"
      ? "Zoho Mail"
      : settings.provider === "resend"
        ? "Resend"
        : "Not connected";

  return (
    <div className="mt-8 max-w-xl border border-line bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink">Contact form email</h2>
          <p className="mt-2 text-sm text-ink-muted">
            When someone submits the contact form, a copy is saved in Messages and an email is sent to your inbox.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}
          className={`relative h-7 w-12 shrink-0 transition-colors ${
            settings.enabled ? "bg-brand-blue" : "bg-line"
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 bg-white shadow transition-transform ${
              settings.enabled ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </div>

      <p
        className={`mt-4 text-sm font-medium ${
          settings.providerConfigured ? "text-brand-green" : "text-amber-700"
        }`}
      >
        Provider: {providerLabel}
        {!settings.providerConfigured && " — Zoho API credentials still need to be added in Cloudflare (one-time setup)."}
      </p>

      <label className="mt-6 block text-sm font-medium text-ink" htmlFor="notify-email">
        Send notifications to
      </label>
      <input
        id="notify-email"
        type="email"
        value={settings.notifyEmail}
        onChange={(e) => setSettings({ ...settings, notifyEmail: e.target.value })}
        className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
      />
      <p className="mt-1 text-xs text-ink-muted">Usually your Zoho inbox, e.g. info@eco-marina.com</p>

      <label className="mt-4 block text-sm font-medium text-ink" htmlFor="from-name">
        From name
      </label>
      <input
        id="from-name"
        type="text"
        value={settings.fromName}
        onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
        maxLength={100}
        className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
      />

      <label className="mt-4 block text-sm font-medium text-ink" htmlFor="from-email">
        From email
      </label>
      <input
        id="from-email"
        type="email"
        value={settings.fromEmail}
        onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
        className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
      />
      <p className="mt-1 text-xs text-ink-muted">Must be a mailbox on your Zoho account (same domain).</p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-4 text-sm text-sea">{message}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save email settings"}
        </button>
        <button
          type="button"
          onClick={sendTest}
          disabled={testing || !settings.providerConfigured}
          className="border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper disabled:opacity-60"
        >
          {testing ? "Sending…" : "Send test email"}
        </button>
      </div>

      <details className="mt-6 border border-line bg-paper p-4 text-sm text-ink-muted">
        <summary className="cursor-pointer font-medium text-ink">One-time Zoho setup (Cloudflare)</summary>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            In{" "}
            <a
              href="https://api-console.zoho.eu/"
              className="text-sea underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zoho API Console
            </a>
            , create a <strong>Server-based</strong> app with scope <code className="text-xs">ZohoMail.messages.CREATE</code>.
          </li>
          <li>Generate a refresh token for your Zoho Mail account (use <code className="text-xs">access_type=offline</code>).</li>
          <li>
            In Cloudflare → eco-marina → Settings → Environment variables, add{" "}
            <code className="text-xs">ZOHO_CLIENT_ID</code>, <code className="text-xs">ZOHO_CLIENT_SECRET</code>,{" "}
            <code className="text-xs">ZOHO_REFRESH_TOKEN</code>, and <code className="text-xs">ZOHO_DC=eu</code>.
          </li>
          <li>Redeploy, then use <strong>Send test email</strong> above.</li>
        </ol>
      </details>
    </div>
  );
}

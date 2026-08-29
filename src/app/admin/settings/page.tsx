"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet, apiPut } from "@/lib/api";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGet<{ enabled: boolean }>(API.admin.maintenance)
      .then((d) => setEnabled(d.enabled))
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  async function toggle() {
    setSaving(true);
    const next = !enabled;
    try {
      await apiPut(API.admin.maintenance, { enabled: next });
      setEnabled(next);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-ink-muted">Loading settings…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Settings</h1>
      <p className="mt-2 text-ink-muted">Site-wide configuration.</p>

      <div className="mt-8 max-w-xl border border-line bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">Maintenance mode</h2>
            <p className="mt-2 text-sm text-ink-muted">
              When enabled, visitors to eco-marina.com see the &ldquo;Site update in progress&rdquo; page.
              Admin and API routes remain accessible.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={saving}
            onClick={toggle}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              enabled ? "bg-sea" : "bg-line"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                enabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>
        <p className={`mt-4 text-sm font-medium ${enabled ? "text-amber-700" : "text-sea"}`}>
          Status: {enabled ? "Maintenance ON — public site hidden" : "Live — full website visible"}
        </p>
      </div>
    </div>
  );
}

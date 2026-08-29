"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PARTNERS_CONTENT_KEY,
  getDefaultEnabledPartnerIds,
  partners,
} from "@/content/site-content";
import { API, apiGet, apiPut } from "@/lib/api";

export function AdminPartnerToggles() {
  const router = useRouter();
  const [enabledIds, setEnabledIds] = useState<string[]>(getDefaultEnabledPartnerIds());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiGet<{ content: Record<string, unknown> }>(API.content)
      .then((data) => {
        const override = data.content[PARTNERS_CONTENT_KEY];
        if (Array.isArray(override)) {
          setEnabledIds(override.filter((id): id is string => typeof id === "string"));
        }
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  function toggle(id: string) {
    setEnabledIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      await apiPut(API.admin.content, { key: PARTNERS_CONTENT_KEY, value: enabledIds });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-ink-muted">Loading partners…</p>;

  return (
    <div className="mt-8 max-w-xl border border-line bg-white p-6">
      <h2 className="font-serif text-xl font-semibold text-ink">Partners</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Choose which partners appear on the About page. Disabled partners are hidden from the public site immediately.
      </p>

      <ul className="mt-6 space-y-4">
        {partners.map((partner) => {
          const on = enabledIds.includes(partner.id);
          return (
            <li key={partner.id} className="flex items-start justify-between gap-4 border border-line p-4">
              <div>
                <p className="font-medium text-ink">{partner.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{partner.location}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={`Show ${partner.name}`}
                onClick={() => toggle(partner.id)}
                className={`relative h-7 w-12 shrink-0 transition-colors ${on ? "bg-brand-blue" : "bg-line"}`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 bg-white shadow transition-transform ${
                    on ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save partners"}
        </button>
        {saved && <span className="text-sm text-brand-green">Saved</span>}
      </div>
    </div>
  );
}

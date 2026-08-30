"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hero as heroEn } from "@/content/en/site-content";
import { hero as heroNl } from "@/content/nl/site-content";
import { site } from "@/content/site-content";
import { CMS_KEYS } from "@/lib/content-keys";
import { API, apiGet, apiPut } from "@/lib/api";

const EDITABLE = [
  {
    section: "English",
    fields: [
      { key: CMS_KEYS.heroHeadline, label: "Homepage headline (EN)", default: heroEn.headline },
      { key: CMS_KEYS.heroSubheadline, label: "Homepage subheadline (EN)", default: heroEn.subheadline },
    ],
  },
  {
    section: "Nederlands",
    fields: [
      { key: CMS_KEYS.heroHeadlineNl, label: "Homepage headline (NL)", default: heroNl.headline },
      { key: CMS_KEYS.heroSubheadlineNl, label: "Homepage subheadline (NL)", default: heroNl.subheadline },
    ],
  },
  {
    section: "Contact (all languages)",
    fields: [
      { key: CMS_KEYS.siteEmail, label: "Contact email", default: site.email },
      { key: CMS_KEYS.sitePhone, label: "Contact phone", default: site.phone },
      { key: CMS_KEYS.siteOffice, label: "Office location", default: site.office },
    ],
  },
];

export default function AdminContentPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    apiGet<{ content: Record<string, unknown> }>(API.content)
      .then((d) => {
        const next: Record<string, string> = {};
        for (const group of EDITABLE) {
          for (const field of group.fields) {
            const override = d.content[field.key];
            next[field.key] = typeof override === "string" ? override : field.default;
          }
        }
        setValues(next);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function save(key: string) {
    await apiPut(API.admin.content, { key, value: values[key] });
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Content</h1>
      <p className="mt-2 text-ink-muted">
        Edit contact email, phone, and office. For hero headline/subheadline, use Hero (or save here — Content overrides take precedence until migrated).
      </p>

      <div className="mt-8 space-y-10">
        {EDITABLE.map((group) => (
          <div key={group.section}>
            <h2 className="font-serif text-xl font-semibold text-ink">{group.section}</h2>
            <div className="mt-4 space-y-6">
              {group.fields.map((field) => (
                <div key={field.key} className="border border-line bg-white p-5">
                  <label className="text-sm font-medium text-ink" htmlFor={field.key}>
                    {field.label}
                  </label>
                  {field.key.includes("subheadline") ? (
                    <textarea
                      id={field.key}
                      rows={3}
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      className="mt-2 w-full border border-line px-3 py-2 text-sm focus:border-sea focus:outline-none"
                    />
                  ) : (
                    <input
                      id={field.key}
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      className="mt-2 w-full border border-line px-3 py-2 text-sm focus:border-sea focus:outline-none"
                    />
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => save(field.key)}
                      className="bg-sea px-4 py-2 text-sm font-semibold text-white hover:bg-sea-dark"
                    >
                      Save
                    </button>
                    {saved === field.key && <span className="text-sm text-sea">Saved</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

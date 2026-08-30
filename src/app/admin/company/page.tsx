"use client";

import { useCallback } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedListField, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import { defaultCmsCompany } from "@/lib/cms/defaults";
import type { CmsCompany } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminCompanyPage() {
  const getDefault = useCallback(() => defaultCmsCompany(), []);
  const { data, setData, loading, saving, save, message, error } = useAdminCms<CmsCompany>("company", getDefault);

  if (loading) return <p className="text-ink-muted">Loading company info…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Company info</h1>
      <p className="mt-2 text-ink-muted">
        Tagline, stats, and LinkedIn shown in the header, footer, and homepage hero.
      </p>

      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedInput label="Tagline" value={data.tagline} onChange={(tagline) => setData({ ...data, tagline })} />
        <LocalizedInput label="Motto" value={data.motto} onChange={(motto) => setData({ ...data, motto })} />

        <div>
          <label className="text-sm font-medium text-ink">LinkedIn URL</label>
          <input
            value={data.linkedIn}
            onChange={(e) => setData({ ...data, linkedIn: e.target.value })}
            className="mt-1 w-full border border-line px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-ink">Founded (year)</label>
            <input
              type="number"
              value={data.since}
              onChange={(e) => setData({ ...data, since: Number(e.target.value) || data.since })}
              className="mt-1 w-full border border-line px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Projects stat</label>
            <input
              type="number"
              value={data.statsProjects}
              onChange={(e) => setData({ ...data, statsProjects: Number(e.target.value) || 0 })}
              className="mt-1 w-full border border-line px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Countries stat</label>
            <input
              type="number"
              value={data.statsCountries}
              onChange={(e) => setData({ ...data, statsCountries: Number(e.target.value) || 0 })}
              className="mt-1 w-full border border-line px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} />
    </div>
  );
}

"use client";

import { AdminSaveBar, LocalizedInput, LocalizedListField } from "@/components/admin/cms/CmsFormFields";
import type { CmsCompany } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminCompanyPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsCompany>("company");

  if (loading) return <p className="text-ink-muted">Loading company info…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Company info</h1>
      <p className="mt-2 text-ink-muted">
        Site name, contact details, tagline, stats, and operating regions used across the header, footer, hero, and structured data.
      </p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedInput label="Site name" value={data.name} onChange={(name) => setData({ ...data, name })} />
        <LocalizedInput label="Tagline" value={data.tagline} onChange={(tagline) => setData({ ...data, tagline })} />
        <LocalizedInput label="Motto" value={data.motto} onChange={(motto) => setData({ ...data, motto })} />
        <div>
          <label className="text-sm font-medium text-ink">Contact email</label>
          <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Contact phone</label>
          <input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
        </div>
        <LocalizedInput label="Office location" value={data.office} onChange={(office) => setData({ ...data, office })} />
        <div>
          <label className="text-sm font-medium text-ink">Domain</label>
          <input value={data.domain} onChange={(e) => setData({ ...data, domain: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">LinkedIn URL</label>
          <input value={data.linkedIn} onChange={(e) => setData({ ...data, linkedIn: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
        </div>
        <LocalizedListField label="Operating regions" value={data.operatingRegions} onChange={(operatingRegions) => setData({ ...data, operatingRegions })} />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-ink">Founded (year)</label>
            <input type="number" value={data.since} onChange={(e) => setData({ ...data, since: Number(e.target.value) || data.since })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Projects stat</label>
            <input type="number" value={data.statsProjects} onChange={(e) => setData({ ...data, statsProjects: Number(e.target.value) || 0 })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Countries stat</label>
            <input type="number" value={data.statsCountries} onChange={(e) => setData({ ...data, statsCountries: Number(e.target.value) || 0 })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
          </div>
        </div>
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

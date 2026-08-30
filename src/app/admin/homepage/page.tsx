"use client";

import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsHomepage } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminHomepagePage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsHomepage>("homepage");
  if (loading) return <p className="text-ink-muted">Loading homepage…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Homepage</h1>
      <p className="mt-2 text-ink-muted">Edit homepage section headings and mission text.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedInput label="Services eyebrow" value={data.servicesEyebrow} onChange={(v) => setData({ ...data, servicesEyebrow: v })} />
        <LocalizedInput label="Services title" value={data.servicesTitle} onChange={(v) => setData({ ...data, servicesTitle: v })} />
        <LocalizedTextarea label="Services description" value={data.servicesDescription} onChange={(v) => setData({ ...data, servicesDescription: v })} />
        <LocalizedInput label="Mission eyebrow" value={data.missionEyebrow} onChange={(v) => setData({ ...data, missionEyebrow: v })} />
        <LocalizedInput label="Mission title" value={data.missionTitle} onChange={(v) => setData({ ...data, missionTitle: v })} />
        <LocalizedTextarea label="Mission text" value={data.missionText} onChange={(v) => setData({ ...data, missionText: v })} />
        <LocalizedTextarea label="Mission approach" value={data.missionApproach} onChange={(v) => setData({ ...data, missionApproach: v })} />
        <LocalizedInput label="Why us eyebrow" value={data.whyUsEyebrow} onChange={(v) => setData({ ...data, whyUsEyebrow: v })} />
        <LocalizedInput label="Why us title" value={data.whyUsTitle} onChange={(v) => setData({ ...data, whyUsTitle: v })} />
        <LocalizedInput label="Cases eyebrow" value={data.casesEyebrow} onChange={(v) => setData({ ...data, casesEyebrow: v })} />
        <LocalizedInput label="Cases title" value={data.casesTitle} onChange={(v) => setData({ ...data, casesTitle: v })} />
        <LocalizedTextarea label="Cases description" value={data.casesDescription} onChange={(v) => setData({ ...data, casesDescription: v })} />
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

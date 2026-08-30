"use client";

import { AdminSaveBar, LocalizedInput, LocalizedListField, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsAbout } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminAboutPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsAbout>("about");
  if (loading) return <p className="text-ink-muted">Loading about page…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">About</h1>
      <p className="mt-2 text-ink-muted">Founder biography, credentials, and company mission on the About page.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedInput label="Name" value={data.name} onChange={(name) => setData({ ...data, name })} />
        <LocalizedInput label="Title" value={data.title} onChange={(title) => setData({ ...data, title })} />
        <input value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} className="w-full border border-line px-3 py-2 text-sm" placeholder="Photo URL" />
        <LocalizedInput label="Photo alt text" value={data.imageAlt} onChange={(imageAlt) => setData({ ...data, imageAlt })} />
        <LocalizedTextarea label="Short bio" value={data.bioShort} onChange={(bioShort) => setData({ ...data, bioShort })} />
        <LocalizedListField label="Long bio paragraphs" value={data.bioLong} onChange={(bioLong) => setData({ ...data, bioLong })} />
        <LocalizedListField label="Credentials" value={data.credentials} onChange={(credentials) => setData({ ...data, credentials })} />
        <LocalizedListField label="Areas of work" value={data.focus} onChange={(focus) => setData({ ...data, focus })} />
        <LocalizedListField label="Countries" value={data.countries} onChange={(countries) => setData({ ...data, countries })} />
        <LocalizedInput label="Quote" value={data.quote} onChange={(quote) => setData({ ...data, quote })} />
        <LocalizedInput label="Quote source" value={data.quoteSource} onChange={(quoteSource) => setData({ ...data, quoteSource })} />
        <LocalizedTextarea label="Mission" value={data.mission} onChange={(mission) => setData({ ...data, mission })} />
        <LocalizedTextarea label="Approach" value={data.approach} onChange={(approach) => setData({ ...data, approach })} />
        <LocalizedListField label="Values" value={data.values} onChange={(values) => setData({ ...data, values })} />
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

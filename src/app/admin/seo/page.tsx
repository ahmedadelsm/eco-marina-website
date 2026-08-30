"use client";

import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsSeoEntry } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminSeoPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsSeoEntry[]>("seo");
  if (loading) return <p className="text-ink-muted">Loading SEO…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">SEO</h1>
      <p className="mt-2 text-ink-muted">Page titles and meta descriptions (applied in the browser after load).</p>
      <div className="mt-8 space-y-6">
        {data.map((entry, index) => (
          <div key={entry.path} className="border border-line bg-white p-5">
            <p className="font-mono text-sm font-medium text-ink">{entry.path}</p>
            <div className="mt-4 space-y-4">
              <LocalizedInput label="Title" value={entry.title} onChange={(title) => setData(data.map((e, i) => (i === index ? { ...e, title } : e)))} />
              <LocalizedTextarea label="Description" value={entry.description} onChange={(description) => setData(data.map((e, i) => (i === index ? { ...e, description } : e)))} />
            </div>
          </div>
        ))}
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

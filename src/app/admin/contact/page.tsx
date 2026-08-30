"use client";

import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsContact } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminContactPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsContact>("contact");
  if (loading) return <p className="text-ink-muted">Loading contact settings…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Contact page</h1>
      <p className="mt-2 text-ink-muted">Contact page intro text and form dropdown labels. Email and phone are edited under Content.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedTextarea label="Page intro" value={data.pageIntro} onChange={(pageIntro) => setData({ ...data, pageIntro })} />
        <LocalizedInput label="Response time note" value={data.responseTime} onChange={(responseTime) => setData({ ...data, responseTime })} />
      </div>
      <div className="mt-8 max-w-4xl border border-line bg-white p-6">
        <h2 className="font-serif text-xl font-semibold text-ink">Form service options</h2>
        <p className="mt-2 text-sm text-ink-muted">Option values are fixed for message routing — edit labels only.</p>
        <div className="mt-6 space-y-4">
          {data.serviceOptions.map((option, index) => (
            <div key={option.id} className="border border-line p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-light">Value: {option.value}</p>
              <LocalizedInput
                label="Label"
                value={option.label}
                onChange={(label) => {
                  const serviceOptions = data.serviceOptions.map((o, i) => (i === index ? { ...o, label } : o));
                  setData({ ...data, serviceOptions });
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

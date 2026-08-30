"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsResourceGroup, CmsResources } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminResourcesPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsResources>("resources");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading resources…</p>;

  function updateGroup(groupIndex: number, patch: Partial<CmsResourceGroup>) {
    const groups = data.groups.map((group, i) => (i === groupIndex ? { ...group, ...patch } : group));
    setData({ ...data, groups });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Resources</h1>
      <p className="mt-2 text-ink-muted">Resources page copy and downloadable item listings.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedInput label="Eyebrow" value={data.eyebrow} onChange={(eyebrow) => setData({ ...data, eyebrow })} />
        <LocalizedInput label="Heading" value={data.heading} onChange={(heading) => setData({ ...data, heading })} />
        <LocalizedTextarea label="Page intro" value={data.intro} onChange={(intro) => setData({ ...data, intro })} />
        <LocalizedInput label="Request section title" value={data.requestTitle} onChange={(requestTitle) => setData({ ...data, requestTitle })} />
        <LocalizedTextarea label="Request section intro" value={data.requestIntro} onChange={(requestIntro) => setData({ ...data, requestIntro })} />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Resource groups</h2>
        {data.groups.map((group, groupIndex) => {
          const isOpen = openId === group.id;
          return (
            <div key={group.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : group.id)}>
                {group.category.en}
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Category" value={group.category} onChange={(category) => updateGroup(groupIndex, { category })} />
                  {group.items.map((item, itemIndex) => (
                    <div key={item.id} className="border border-line p-4">
                      <LocalizedInput
                        label="Title"
                        value={item.title}
                        onChange={(title) => {
                          const items = group.items.map((entry, i) => (i === itemIndex ? { ...entry, title } : entry));
                          updateGroup(groupIndex, { items });
                        }}
                      />
                      <LocalizedTextarea
                        label="Description"
                        value={item.description}
                        onChange={(description) => {
                          const items = group.items.map((entry, i) => (i === itemIndex ? { ...entry, description } : entry));
                          updateGroup(groupIndex, { items });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

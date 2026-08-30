"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput } from "@/components/admin/cms/CmsFormFields";
import type { CmsNavigation } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminNavigationPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsNavigation>("navigation");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading navigation…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Navigation</h1>
      <p className="mt-2 text-ink-muted">Header and footer menu labels. Link paths are fixed — edit labels only.</p>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Header menu</h2>
        {data.header.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : item.id)}>
                {item.label.en} <span className="text-xs text-ink-light">{item.href}</span>
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Label" value={item.label} onChange={(label) => {
                    const header = data.header.map((entry, i) => (i === index ? { ...entry, label } : entry));
                    setData({ ...data, header });
                  }} />
                  {item.children?.map((child, childIndex) => (
                    <div key={child.id} className="border border-line p-3">
                      <p className="text-xs text-ink-light">{child.href}</p>
                      <LocalizedInput label="Child label" value={child.label} onChange={(label) => {
                        const header = data.header.map((entry, i) => {
                          if (i !== index || !entry.children) return entry;
                          const children = entry.children.map((c, ci) => (ci === childIndex ? { ...c, label } : c));
                          return { ...entry, children };
                        });
                        setData({ ...data, header });
                      }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Footer links</h2>
        {data.footer.map((item, index) => (
          <div key={item.id} className="border border-line bg-white p-4">
            <p className="text-xs text-ink-light">{item.href}</p>
            <LocalizedInput label="Label" value={item.label} onChange={(label) => {
              const footer = data.footer.map((entry, i) => (i === index ? { ...entry, label } : entry));
              setData({ ...data, footer });
            }} />
          </div>
        ))}
      </div>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

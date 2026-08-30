"use client";

import { useState } from "react";
import { AdminSaveBar, ImageUrlField, LocalizedInput } from "@/components/admin/cms/CmsFormFields";
import type { CmsPartner } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminPartnersPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsPartner[]>("partners");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading partners…</p>;

  function addPartner() {
    const id = `partner-${Date.now()}`;
    setData([
      ...data,
      {
        id,
        published: true,
        name: { en: "New partner", nl: "Nieuwe partner" },
        location: { en: "", nl: "" },
      },
    ]);
    setOpenId(id);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Partners</h1>
      <p className="mt-2 text-ink-muted">Partners shown on the About page. Upload logos via Media, then paste the URL here.</p>
      <button type="button" onClick={addPartner} className="mt-6 text-sm font-medium text-sea hover:underline">
        + Add partner
      </button>
      <div className="mt-6 space-y-4">
        {data.map((partner, index) => {
          const isOpen = openId === partner.id;
          return (
            <div key={partner.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : partner.id)}>
                <span>
                  {partner.name.en}
                  {!partner.published && <span className="ml-2 text-xs text-ink-light">(hidden)</span>}
                </span>
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={partner.published}
                      onChange={(e) => {
                        const next = data.map((p, i) => (i === index ? { ...p, published: e.target.checked } : p));
                        setData(next);
                      }}
                    />
                    Published (visible on site)
                  </label>
                  <LocalizedInput label="Name" value={partner.name} onChange={(name) => {
                    setData(data.map((p, i) => (i === index ? { ...p, name } : p)));
                  }} />
                  <LocalizedInput label="Location" value={partner.location} onChange={(location) => {
                    setData(data.map((p, i) => (i === index ? { ...p, location } : p)));
                  }} />
                  <ImageUrlField
                    label="Logo (optional)"
                    value={partner.logo ?? ""}
                    onChange={(logo) => setData(data.map((p, i) => (i === index ? { ...p, logo: logo || undefined } : p)))}
                    hint="Square PNG or SVG works best. Leave empty to show the partner name as text."
                  />
                  <button
                    type="button"
                    onClick={() => setData(data.filter((_, i) => i !== index))}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete partner
                  </button>
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

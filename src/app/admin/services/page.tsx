"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedListField, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsServices } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminServicesPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsServices>("services");
  const [openId, setOpenId] = useState<string | null>(null);
  if (loading) return <p className="text-ink-muted">Loading services…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Services</h1>
      <p className="mt-2 text-ink-muted">Services page copy and the three core service cards.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedTextarea label="Page intro" value={data.intro} onChange={(intro) => setData({ ...data, intro })} />
        <LocalizedInput label="Core services title" value={data.coreTitle} onChange={(coreTitle) => setData({ ...data, coreTitle })} />
        <LocalizedInput label="CTA button" value={data.cta} onChange={(cta) => setData({ ...data, cta })} />
      </div>
      <div className="mt-8 space-y-4">
        {data.coreServices.map((service, index) => {
          const isOpen = openId === service.id;
          return (
            <div key={service.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : service.id)}>
                {service.title.en}
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Title" value={service.title} onChange={(title) => {
                    const coreServices = data.coreServices.map((s, i) => (i === index ? { ...s, title } : s));
                    setData({ ...data, coreServices });
                  }} />
                  <LocalizedInput label="Short title" value={service.shortTitle} onChange={(shortTitle) => {
                    const coreServices = data.coreServices.map((s, i) => (i === index ? { ...s, shortTitle } : s));
                    setData({ ...data, coreServices });
                  }} />
                  <LocalizedTextarea label="Description" value={service.description} onChange={(description) => {
                    const coreServices = data.coreServices.map((s, i) => (i === index ? { ...s, description } : s));
                    setData({ ...data, coreServices });
                  }} />
                  <LocalizedListField label="Deliverables" value={service.deliverables} onChange={(deliverables) => {
                    const coreServices = data.coreServices.map((s, i) => (i === index ? { ...s, deliverables } : s));
                    setData({ ...data, coreServices });
                  }} />
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

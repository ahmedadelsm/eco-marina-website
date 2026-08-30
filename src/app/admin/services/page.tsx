"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedListField, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsLegacyService, CmsServiceCategory, CmsServices } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminServicesPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsServices>("services");
  const [openId, setOpenId] = useState<string | null>(null);
  if (loading) return <p className="text-ink-muted">Loading services…</p>;

  function updateCategory(index: number, patch: Partial<CmsServiceCategory>) {
    const specialistCategories = data.specialistCategories.map((cat, i) => (i === index ? { ...cat, ...patch } : cat));
    setData({ ...data, specialistCategories });
  }

  function updateLegacy(index: number, patch: Partial<CmsLegacyService>) {
    const legacyServices = data.legacyServices.map((service, i) => (i === index ? { ...service, ...patch } : service));
    setData({ ...data, legacyServices });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Services</h1>
      <p className="mt-2 text-ink-muted">Services page copy, core cards, specialist categories, and legacy services.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedTextarea label="Page intro" value={data.intro} onChange={(intro) => setData({ ...data, intro })} />
        <LocalizedInput label="Core services title" value={data.coreTitle} onChange={(coreTitle) => setData({ ...data, coreTitle })} />
        <LocalizedInput label="Specialist title" value={data.specialistTitle} onChange={(specialistTitle) => setData({ ...data, specialistTitle })} />
        <LocalizedTextarea label="Specialist intro" value={data.specialistIntro} onChange={(specialistIntro) => setData({ ...data, specialistIntro })} />
        <LocalizedInput label="Legacy title" value={data.legacyTitle} onChange={(legacyTitle) => setData({ ...data, legacyTitle })} />
        <LocalizedTextarea label="Legacy intro" value={data.legacyIntro} onChange={(legacyIntro) => setData({ ...data, legacyIntro })} />
        <LocalizedInput label="CTA button" value={data.cta} onChange={(cta) => setData({ ...data, cta })} />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Core services</h2>
        {data.coreServices.map((service, index) => {
          const isOpen = openId === `core-${service.id}`;
          return (
            <div key={service.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : `core-${service.id}`)}>
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

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Specialist categories</h2>
        {data.specialistCategories.map((cat, index) => {
          const isOpen = openId === `cat-${cat.id}`;
          return (
            <div key={cat.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : `cat-${cat.id}`)}>
                {cat.title.en}
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Title" value={cat.title} onChange={(title) => updateCategory(index, { title })} />
                  <LocalizedTextarea label="Description" value={cat.description} onChange={(description) => updateCategory(index, { description })} />
                  <LocalizedListField label="Items" value={cat.items} onChange={(items) => updateCategory(index, { items })} />
                  <div>
                    <label className="text-sm font-medium text-ink">Image URL</label>
                    <input value={cat.image} onChange={(e) => updateCategory(index, { image: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Legacy services</h2>
        {data.legacyServices.map((service, index) => {
          const isOpen = openId === `legacy-${service.id}`;
          return (
            <div key={service.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : `legacy-${service.id}`)}>
                {service.title.en}
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Title" value={service.title} onChange={(title) => updateLegacy(index, { title })} />
                  <LocalizedTextarea label="Description" value={service.description} onChange={(description) => updateLegacy(index, { description })} />
                  <div>
                    <label className="text-sm font-medium text-ink">Image URL</label>
                    <input value={service.image} onChange={(e) => updateLegacy(index, { image: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ink">Link (href)</label>
                    <input value={service.href} onChange={(e) => updateLegacy(index, { href: e.target.value })} className="mt-1 w-full border border-line px-3 py-2 text-sm" />
                  </div>
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

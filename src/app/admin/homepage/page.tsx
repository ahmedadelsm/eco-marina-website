"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsHomepage, CmsProcessStep, CmsWhyUsCard } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminHomepagePage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsHomepage>("homepage");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading homepage…</p>;

  function updateWhyUs(index: number, patch: Partial<CmsWhyUsCard>) {
    const whyUsCards = data.whyUsCards.map((card, i) => (i === index ? { ...card, ...patch } : card));
    setData({ ...data, whyUsCards });
  }

  function updateProcess(index: number, patch: Partial<CmsProcessStep>) {
    const processSteps = data.processSteps.map((step, i) => (i === index ? { ...step, ...patch } : step));
    setData({ ...data, processSteps });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Homepage</h1>
      <p className="mt-2 text-ink-muted">Section headings, why-us cards, legacy block, and process steps.</p>
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
        <LocalizedInput label="Legacy eyebrow" value={data.legacyEyebrow} onChange={(v) => setData({ ...data, legacyEyebrow: v })} />
        <LocalizedInput label="Legacy title" value={data.legacyTitle} onChange={(v) => setData({ ...data, legacyTitle: v })} />
        <LocalizedTextarea label="Legacy description" value={data.legacyDescription} onChange={(v) => setData({ ...data, legacyDescription: v })} />
        <LocalizedInput label="Process eyebrow" value={data.processEyebrow} onChange={(v) => setData({ ...data, processEyebrow: v })} />
        <LocalizedInput label="Process title" value={data.processTitle} onChange={(v) => setData({ ...data, processTitle: v })} />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Why us cards</h2>
        {data.whyUsCards.map((card, index) => {
          const isOpen = openId === `why-${card.id}`;
          return (
            <div key={card.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : `why-${card.id}`)}>
                {card.title.en}
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Title" value={card.title} onChange={(title) => updateWhyUs(index, { title })} />
                  <LocalizedTextarea label="Description" value={card.description} onChange={(description) => updateWhyUs(index, { description })} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">Process steps</h2>
        {data.processSteps.map((step, index) => {
          const isOpen = openId === `step-${step.id}`;
          return (
            <div key={step.id} className="border border-line bg-white">
              <button type="button" className="flex w-full justify-between px-5 py-4 text-left font-medium" onClick={() => setOpenId(isOpen ? null : `step-${step.id}`)}>
                {step.title.en}
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-line px-5 py-5">
                  <LocalizedInput label="Step number" value={step.step} onChange={(s) => updateProcess(index, { step: s })} />
                  <LocalizedInput label="Title" value={step.title} onChange={(title) => updateProcess(index, { title })} />
                  <LocalizedTextarea label="Description" value={step.description} onChange={(description) => updateProcess(index, { description })} />
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

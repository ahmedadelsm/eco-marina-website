"use client";

import { AdminSaveBar, ImageUrlField, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsHero } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminHeroPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsHero>("hero");
  if (loading) return <p className="text-ink-muted">Loading hero…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Homepage hero</h1>
      <p className="mt-2 text-ink-muted">Hero image, eyebrow, CTAs, and homepage headline copy.</p>
      <div className="mt-8 max-w-4xl space-y-6 border border-line bg-white p-6">
        <LocalizedInput label="Eyebrow" value={data.eyebrow} onChange={(eyebrow) => setData({ ...data, eyebrow })} />
        <LocalizedInput label="Headline" value={data.headline} onChange={(headline) => setData({ ...data, headline })} />
        <LocalizedTextarea label="Subheadline" value={data.subheadline} onChange={(subheadline) => setData({ ...data, subheadline })} />
        <LocalizedInput label="Primary CTA" value={data.cta} onChange={(cta) => setData({ ...data, cta })} />
        <LocalizedInput label="Secondary CTA" value={data.ctaSecondary} onChange={(ctaSecondary) => setData({ ...data, ctaSecondary })} />
        <ImageUrlField label="Hero image URL" value={data.image} onChange={(image) => setData({ ...data, image })} />
        <LocalizedInput label="Image alt text" value={data.imageAlt} onChange={(imageAlt) => setData({ ...data, imageAlt })} />
      </div>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

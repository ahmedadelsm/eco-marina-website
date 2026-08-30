"use client";

import { useState } from "react";
import { AdminSaveBar, ImageUrlField, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsInsight } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminInsightsPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsInsight[]>("insights");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading insights…</p>;

  function update(index: number, insight: CmsInsight) {
    setData(data.map((item, i) => (i === index ? insight : item)));
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Insights</h1>
      <p className="mt-2 text-ink-muted">Manage blog articles in English and Dutch.</p>

      <div className="mt-8 space-y-4">
        {data.map((insight, index) => {
          const isOpen = openId === insight.id;
          return (
            <div key={insight.id} className="border border-line bg-white">
              <button type="button" className="flex w-full items-center justify-between px-5 py-4 text-left" onClick={() => setOpenId(isOpen ? null : insight.id)}>
                <span className="font-medium text-ink">{insight.title.en}</span>
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-5 border-t border-line px-5 py-5">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={insight.published} onChange={(e) => update(index, { ...insight, published: e.target.checked })} />
                    Published
                  </label>
                  <input value={insight.slug} onChange={(e) => update(index, { ...insight, slug: slugify(e.target.value) })} className="w-full border border-line px-3 py-2 text-sm" placeholder="slug" />
                  <ImageUrlField label="Cover image" value={insight.image} onChange={(image) => update(index, { ...insight, image })} />
                  <LocalizedInput label="Title" value={insight.title} onChange={(title) => update(index, { ...insight, title })} />
                  <LocalizedInput label="Excerpt" value={insight.excerpt} onChange={(excerpt) => update(index, { ...insight, excerpt })} />
                  <LocalizedInput label="Category" value={insight.category} onChange={(category) => update(index, { ...insight, category })} />
                  {insight.sections.map((section, sIndex) => (
                    <div key={section.id} className="space-y-3 border border-line bg-paper p-4">
                      <LocalizedInput label="Section heading" value={section.heading} onChange={(heading) => {
                        const sections = insight.sections.map((s, i) => (i === sIndex ? { ...s, heading } : s));
                        update(index, { ...insight, sections });
                      }} />
                      <LocalizedTextarea label="Section body" value={section.body} onChange={(body) => {
                        const sections = insight.sections.map((s, i) => (i === sIndex ? { ...s, body } : s));
                        update(index, { ...insight, sections });
                      }} />
                    </div>
                  ))}
                  <button type="button" onClick={() => setData(data.filter((_, i) => i !== index))} className="text-sm text-red-600 hover:underline">Delete article</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button type="button" onClick={() => setData([...data, { id: `insight-${Date.now()}`, slug: `article-${Date.now()}`, published: false, category: { en: "", nl: "" }, readTime: { en: "3 min read", nl: "3 min lezen" }, date: { en: "", nl: "" }, datePublished: new Date().toISOString().slice(0, 10), image: "/images/insights/sustainable-tourism.jpg", title: { en: "New article", nl: "Nieuw artikel" }, excerpt: { en: "", nl: "" }, sections: [{ id: "s0", heading: { en: "", nl: "" }, body: { en: "", nl: "" } }] }])} className="mt-6 border border-line bg-white px-4 py-2 text-sm font-medium">+ Add article</button>
      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

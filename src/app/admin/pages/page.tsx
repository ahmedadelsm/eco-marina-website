"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedListField, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsPages } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

function PageBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-line bg-white p-6">
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export default function AdminPagesPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsPages>("pages");
  const [open, setOpen] = useState("projects");

  if (loading) return <p className="text-ink-muted">Loading page copy…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Page copy</h1>
      <p className="mt-2 text-ink-muted">Hero text and CTAs for inner pages and service detail content.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["projects", "insights", "services", "faq", "about", "impactAssessment", "monitoring"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setOpen(key)}
            className={`border px-3 py-1.5 text-sm ${open === key ? "border-sea bg-sea-light text-sea" : "border-line bg-white"}`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-4xl">
        {open === "projects" && (
          <PageBlock title="Projects">
            <LocalizedInput label="Eyebrow" value={data.projects.eyebrow} onChange={(eyebrow) => setData({ ...data, projects: { ...data.projects, eyebrow } })} />
            <LocalizedInput label="Heading" value={data.projects.heading} onChange={(heading) => setData({ ...data, projects: { ...data.projects, heading } })} />
            <LocalizedTextarea label="Intro" value={data.projects.intro} onChange={(intro) => setData({ ...data, projects: { ...data.projects, intro } })} />
            <LocalizedInput label="CTA" value={data.projects.cta!} onChange={(cta) => setData({ ...data, projects: { ...data.projects, cta } })} />
            <LocalizedInput label="Image alt" value={data.projects.imageAlt!} onChange={(imageAlt) => setData({ ...data, projects: { ...data.projects, imageAlt } })} />
            <div>
              <label className="text-sm font-medium text-ink">Hero image URL</label>
              <input
                value={data.projects.image ?? ""}
                onChange={(e) => setData({ ...data, projects: { ...data.projects, image: e.target.value } })}
                className="mt-1 w-full border border-line px-3 py-2 text-sm"
              />
            </div>
          </PageBlock>
        )}

        {open === "insights" && (
          <PageBlock title="Insights">
            <LocalizedInput label="Eyebrow" value={data.insights.eyebrow} onChange={(eyebrow) => setData({ ...data, insights: { ...data.insights, eyebrow } })} />
            <LocalizedInput label="Heading" value={data.insights.heading} onChange={(heading) => setData({ ...data, insights: { ...data.insights, heading } })} />
            <LocalizedTextarea label="Intro" value={data.insights.intro} onChange={(intro) => setData({ ...data, insights: { ...data.insights, intro } })} />
            <LocalizedInput label="Written by" value={data.insights.writtenBy} onChange={(writtenBy) => setData({ ...data, insights: { ...data.insights, writtenBy } })} />
            <LocalizedInput label="Founder note" value={data.insights.founderNote} onChange={(founderNote) => setData({ ...data, insights: { ...data.insights, founderNote } })} />
            <LocalizedInput label="Discuss CTA" value={data.insights.discuss} onChange={(discuss) => setData({ ...data, insights: { ...data.insights, discuss } })} />
          </PageBlock>
        )}

        {open === "services" && (
          <PageBlock title="Services list page">
            <LocalizedInput label="Eyebrow" value={data.services.eyebrow} onChange={(eyebrow) => setData({ ...data, services: { ...data.services, eyebrow } })} />
            <LocalizedInput label="Heading" value={data.services.heading} onChange={(heading) => setData({ ...data, services: { ...data.services, heading } })} />
          </PageBlock>
        )}

        {open === "faq" && (
          <PageBlock title="FAQ">
            <LocalizedInput label="Eyebrow" value={data.faq.eyebrow} onChange={(eyebrow) => setData({ ...data, faq: { ...data.faq, eyebrow } })} />
            <LocalizedInput label="Heading" value={data.faq.heading} onChange={(heading) => setData({ ...data, faq: { ...data.faq, heading } })} />
          </PageBlock>
        )}

        {open === "about" && (
          <PageBlock title="About labels">
            <LocalizedInput label="Eyebrow" value={data.about.eyebrow} onChange={(eyebrow) => setData({ ...data, about: { ...data.about, eyebrow } })} />
            <LocalizedInput label="Founder of" value={data.about.founderOf} onChange={(founderOf) => setData({ ...data, about: { ...data.about, founderOf } })} />
            <LocalizedInput label="Credentials" value={data.about.credentials} onChange={(credentials) => setData({ ...data, about: { ...data.about, credentials } })} />
            <LocalizedInput label="Career timeline" value={data.about.careerTimeline} onChange={(careerTimeline) => setData({ ...data, about: { ...data.about, careerTimeline } })} />
            <LocalizedInput label="Areas of work" value={data.about.areasOfWork} onChange={(areasOfWork) => setData({ ...data, about: { ...data.about, areasOfWork } })} />
            <LocalizedInput label="Countries" value={data.about.countries} onChange={(countries) => setData({ ...data, about: { ...data.about, countries } })} />
            <LocalizedInput label="Our values" value={data.about.ourValues} onChange={(ourValues) => setData({ ...data, about: { ...data.about, ourValues } })} />
            <LocalizedInput label="LinkedIn link text" value={data.about.linkedIn} onChange={(linkedIn) => setData({ ...data, about: { ...data.about, linkedIn } })} />
          </PageBlock>
        )}

        {open === "impactAssessment" && (
          <PageBlock title="Impact assessment detail">
            <LocalizedInput label="Service eyebrow" value={data.impactAssessment.serviceEyebrow} onChange={(serviceEyebrow) => setData({ ...data, impactAssessment: { ...data.impactAssessment, serviceEyebrow } })} />
            <LocalizedInput label="CTA" value={data.impactAssessment.cta} onChange={(cta) => setData({ ...data, impactAssessment: { ...data.impactAssessment, cta } })} />
            <LocalizedTextarea label="Overview" value={data.impactAssessment.overview} onChange={(overview) => setData({ ...data, impactAssessment: { ...data.impactAssessment, overview } })} />
            <LocalizedListField label="Process steps" value={data.impactAssessment.steps} onChange={(steps) => setData({ ...data, impactAssessment: { ...data.impactAssessment, steps } })} />
          </PageBlock>
        )}

        {open === "monitoring" && (
          <PageBlock title="Monitoring detail">
            <LocalizedInput label="Service eyebrow" value={data.monitoring.serviceEyebrow} onChange={(serviceEyebrow) => setData({ ...data, monitoring: { ...data.monitoring, serviceEyebrow } })} />
            <LocalizedInput label="CTA" value={data.monitoring.cta} onChange={(cta) => setData({ ...data, monitoring: { ...data.monitoring, cta } })} />
            <LocalizedTextarea label="Overview" value={data.monitoring.overview} onChange={(overview) => setData({ ...data, monitoring: { ...data.monitoring, overview } })} />
            {data.monitoring.areas.map((area, index) => (
              <div key={area.id} className="border border-line p-4">
                <LocalizedInput label="Area name" value={area.name} onChange={(name) => {
                  const areas = data.monitoring.areas.map((a, i) => (i === index ? { ...a, name } : a));
                  setData({ ...data, monitoring: { ...data.monitoring, areas } });
                }} />
                <LocalizedListField label="Items" value={area.items} onChange={(items) => {
                  const areas = data.monitoring.areas.map((a, i) => (i === index ? { ...a, items } : a));
                  setData({ ...data, monitoring: { ...data.monitoring, areas } });
                }} />
              </div>
            ))}
          </PageBlock>
        )}
      </div>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  AdminSaveBar,
  LocalizedInput,
  LocalizedListField,
  LocalizedTextarea,
} from "@/components/admin/cms/CmsFormFields";
import type { CmsProject } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminProjectsPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsProject[]>("projects");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading case studies…</p>;

  function updateProject(index: number, project: CmsProject) {
    setData(data.map((item, i) => (i === index ? project : item)));
  }

  function addProject() {
    const id = `project-${Date.now()}`;
    const project: CmsProject = {
      id,
      slug: `new-case-study-${Date.now()}`,
      published: false,
      image: "/images/projects/shipping-agency.jpg",
      category: { en: "", nl: "" },
      title: { en: "New case study", nl: "Nieuwe casestudy" },
      summary: { en: "", nl: "" },
      location: { en: "", nl: "" },
      client: { en: "", nl: "" },
      challenge: { en: "", nl: "" },
      approach: { en: [], nl: [] },
      outcomes: { en: [], nl: [] },
      services: { en: [], nl: [] },
    };
    setData([...data, project]);
    setOpenId(id);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Case studies</h1>
      <p className="mt-2 text-ink-muted">
        Edit project pages in English and Dutch. Upload images in Media, then paste the URL below.
      </p>
      <p className="mt-2 text-sm text-amber-800">
        New case studies work immediately — including their detail pages — after you deploy the latest site update.
      </p>

      <div className="mt-8 space-y-4">
        {data.map((project, index) => {
          const isOpen = openId === project.id;
          return (
            <div key={project.id} className="border border-line bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenId(isOpen ? null : project.id)}
              >
                <div>
                  <p className="font-medium text-ink">{project.title.en || project.slug}</p>
                  <p className="text-xs text-ink-muted">{project.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${project.published ? "text-brand-green" : "text-amber-700"}`}>
                    {project.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-sea">{isOpen ? "−" : "+"}</span>
                </div>
              </button>
              {isOpen && (
                <div className="space-y-5 border-t border-line px-5 py-5">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={project.published}
                      onChange={(e) => updateProject(index, { ...project, published: e.target.checked })}
                    />
                    Published (visible on website)
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-ink">URL slug</label>
                      <input
                        value={project.slug}
                        onChange={(e) =>
                          updateProject(index, { ...project, slug: slugify(e.target.value) || project.slug })
                        }
                        className="mt-1 w-full border border-line px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ink">Image URL</label>
                      <input
                        value={project.image}
                        onChange={(e) => updateProject(index, { ...project, image: e.target.value })}
                        className="mt-1 w-full border border-line px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <LocalizedInput
                    label="Title"
                    value={project.title}
                    onChange={(title) => {
                      const slug = project.slug.startsWith("new-case-study") ? slugify(title.en) : project.slug;
                      updateProject(index, { ...project, title, slug: slug || project.slug });
                    }}
                  />
                  <LocalizedInput
                    label="Category"
                    value={project.category}
                    onChange={(category) => updateProject(index, { ...project, category })}
                  />
                  <LocalizedTextarea
                    label="Summary"
                    value={project.summary}
                    onChange={(summary) => updateProject(index, { ...project, summary })}
                  />
                  <LocalizedInput
                    label="Location"
                    value={project.location}
                    onChange={(location) => updateProject(index, { ...project, location })}
                  />
                  <LocalizedInput
                    label="Client"
                    value={project.client}
                    onChange={(client) => updateProject(index, { ...project, client })}
                  />
                  <LocalizedTextarea
                    label="Challenge"
                    value={project.challenge}
                    onChange={(challenge) => updateProject(index, { ...project, challenge })}
                  />
                  <LocalizedListField
                    label="Approach steps"
                    value={project.approach}
                    onChange={(approach) => updateProject(index, { ...project, approach })}
                  />
                  <LocalizedListField
                    label="Outcomes"
                    value={project.outcomes}
                    onChange={(outcomes) => updateProject(index, { ...project, outcomes })}
                  />
                  <LocalizedListField
                    label="Services"
                    value={project.services}
                    onChange={(services) => updateProject(index, { ...project, services })}
                  />

                  <button
                    type="button"
                    onClick={() => setData(data.filter((_, i) => i !== index))}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete case study
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="mt-6 border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
      >
        + Add case study
      </button>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

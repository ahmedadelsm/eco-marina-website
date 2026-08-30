"use client";

import { useState } from "react";
import {
  AdminSaveBar,
  LocalizedInput,
  LocalizedListField,
  LocalizedTextarea,
} from "@/components/admin/cms/CmsFormFields";
import type { CmsTrainingCourse } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminTrainingPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsTrainingCourse[]>("training");
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading training courses…</p>;

  function updateCourse(index: number, course: CmsTrainingCourse) {
    setData(data.map((item, i) => (i === index ? course : item)));
  }

  function addCourse() {
    const id = `course-${Date.now()}`;
    setData([
      ...data,
      {
        id,
        published: false,
        duration: { en: "1 day", nl: "1 dag" },
        format: { en: "In-person or online", nl: "Op locatie of online" },
        image: "/images/training/eia-workshop.jpg",
        imageAlt: { en: "", nl: "" },
        title: { en: "New course", nl: "Nieuwe cursus" },
        description: { en: "", nl: "" },
        topics: { en: [], nl: [] },
        audience: { en: "", nl: "" },
        experience: { en: "", nl: "" },
        pricing: { en: "On request", nl: "Op aanvraag" },
        schedule: { en: "By arrangement", nl: "In overleg" },
      },
    ]);
    setOpenId(id);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Training courses</h1>
      <p className="mt-2 text-ink-muted">Manage training programmes, pricing, and scheduling copy.</p>

      <div className="mt-8 space-y-4">
        {data.map((course, index) => {
          const isOpen = openId === course.id;
          return (
            <div key={course.id} className="border border-line bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenId(isOpen ? null : course.id)}
              >
                <p className="font-medium text-ink">{course.title.en || course.id}</p>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${course.published ? "text-brand-green" : "text-amber-700"}`}>
                    {course.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-sea">{isOpen ? "−" : "+"}</span>
                </div>
              </button>
              {isOpen && (
                <div className="space-y-5 border-t border-line px-5 py-5">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={course.published}
                      onChange={(e) => updateCourse(index, { ...course, published: e.target.checked })}
                    />
                    Published
                  </label>

                  <div>
                    <label className="text-sm font-medium text-ink">Image URL</label>
                    <input
                      value={course.image}
                      onChange={(e) => updateCourse(index, { ...course, image: e.target.value })}
                      className="mt-1 w-full border border-line px-3 py-2 text-sm"
                    />
                  </div>

                  <LocalizedInput
                    label="Title"
                    value={course.title}
                    onChange={(title) => updateCourse(index, { ...course, title })}
                  />
                  <LocalizedInput
                    label="Duration"
                    value={course.duration}
                    onChange={(duration) => updateCourse(index, { ...course, duration })}
                  />
                  <LocalizedInput
                    label="Format"
                    value={course.format}
                    onChange={(format) => updateCourse(index, { ...course, format })}
                  />
                  <LocalizedInput
                    label="Image alt text"
                    value={course.imageAlt}
                    onChange={(imageAlt) => updateCourse(index, { ...course, imageAlt })}
                  />
                  <LocalizedTextarea
                    label="Description"
                    value={course.description}
                    onChange={(description) => updateCourse(index, { ...course, description })}
                  />
                  <LocalizedListField
                    label="Topics"
                    value={course.topics}
                    onChange={(topics) => updateCourse(index, { ...course, topics })}
                  />
                  <LocalizedInput
                    label="Audience"
                    value={course.audience}
                    onChange={(audience) => updateCourse(index, { ...course, audience })}
                  />
                  <LocalizedTextarea
                    label="Experience / grounded in"
                    value={course.experience}
                    onChange={(experience) => updateCourse(index, { ...course, experience })}
                  />
                  <LocalizedInput
                    label="Pricing"
                    value={course.pricing}
                    onChange={(pricing) => updateCourse(index, { ...course, pricing })}
                  />
                  <LocalizedInput
                    label="Schedule"
                    value={course.schedule}
                    onChange={(schedule) => updateCourse(index, { ...course, schedule })}
                  />

                  <button
                    type="button"
                    onClick={() => setData(data.filter((_, i) => i !== index))}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete course
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addCourse}
        className="mt-6 border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
      >
        + Add course
      </button>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}

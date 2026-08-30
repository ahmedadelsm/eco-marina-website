"use client";

import { useCallback, useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import { defaultCmsFaq } from "@/lib/cms/defaults";
import type { CmsFaqSection } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminFaqPage() {
  const getDefault = useCallback(() => defaultCmsFaq(), []);
  const { data, setData, loading, saving, save, message, error } = useAdminCms<CmsFaqSection[]>("faq", getDefault);
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) return <p className="text-ink-muted">Loading FAQ…</p>;

  function updateSection(index: number, section: CmsFaqSection) {
    setData(data.map((item, i) => (i === index ? section : item)));
  }

  function addSection() {
    const id = `faq-${Date.now()}`;
    setData([
      ...data,
      {
        id,
        category: { en: "New category", nl: "Nieuwe categorie" },
        questions: [{ id: `${id}-0`, q: { en: "", nl: "" }, a: { en: "", nl: "" } }],
      },
    ]);
    setOpenId(id);
  }

  function addQuestion(sectionIndex: number) {
    const section = data[sectionIndex];
    const qId = `${section.id}-${section.questions.length}`;
    updateSection(sectionIndex, {
      ...section,
      questions: [...section.questions, { id: qId, q: { en: "", nl: "" }, a: { en: "", nl: "" } }],
    });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">FAQ</h1>
      <p className="mt-2 text-ink-muted">Manage questions and answers in English and Dutch.</p>

      <div className="mt-8 space-y-4">
        {data.map((section, sectionIndex) => {
          const isOpen = openId === section.id;
          return (
            <div key={section.id} className="border border-line bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenId(isOpen ? null : section.id)}
              >
                <span className="font-medium text-ink">{section.category.en || section.category.nl}</span>
                <span className="text-sea">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-6 border-t border-line px-5 py-5">
                  <LocalizedInput
                    label="Category"
                    value={section.category}
                    onChange={(category) => updateSection(sectionIndex, { ...section, category })}
                  />
                  {section.questions.map((item, qIndex) => (
                    <div key={item.id} className="space-y-4 border border-line bg-paper p-4">
                      <LocalizedInput
                        label="Question"
                        value={item.q}
                        onChange={(q) => {
                          const questions = section.questions.map((qItem, i) => (i === qIndex ? { ...qItem, q } : qItem));
                          updateSection(sectionIndex, { ...section, questions });
                        }}
                      />
                      <LocalizedTextarea
                        label="Answer"
                        value={item.a}
                        onChange={(a) => {
                          const questions = section.questions.map((qItem, i) => (i === qIndex ? { ...qItem, a } : qItem));
                          updateSection(sectionIndex, { ...section, questions });
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addQuestion(sectionIndex)}
                    className="text-sm font-medium text-sea hover:underline"
                  >
                    + Add question
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addSection}
        className="mt-6 border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
      >
        + Add category
      </button>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} />
    </div>
  );
}

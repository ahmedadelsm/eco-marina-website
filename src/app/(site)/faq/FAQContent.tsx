"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { useCms } from "@/components/cms/CmsProvider";

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const { faq, pageCopy } = useCms();

  return (
    <>
      <PageHero eyebrow={pageCopy.faq.eyebrow} title={pageCopy.faq.heading} />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {faq.map((section) => (
            <div key={section.category} className="mb-10">
              <h2 className="font-serif text-lg font-semibold text-ink">{section.category}</h2>
              <div className="mt-4 divide-y divide-line border border-line bg-white">
                {section.questions.map((item, index) => {
                  const key = `${section.category}-${item.q}`;
                  const isOpen = openIndex === key;
                  const panelId = `faq-panel-${section.category.replace(/\s+/g, "-").toLowerCase()}-${index}`;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-paper"
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span className="pr-4 text-sm font-medium text-ink">{item.q}</span>
                        <span className="shrink-0 text-sea" aria-hidden>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div id={panelId} className="border-t border-line bg-paper px-5 py-4">
                          <p className="text-sm text-ink-muted">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

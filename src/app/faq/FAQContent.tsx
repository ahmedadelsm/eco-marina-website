"use client";

import { useState } from "react";
import { PageHero } from "@/components/SectionHeading";
import { faq } from "@/content/site-content";

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {faq.map((section) => (
            <div key={section.category} className="mb-10">
              <h2 className="font-serif text-lg font-semibold text-ink">{section.category}</h2>
              <div className="mt-4 divide-y divide-line border border-line bg-white">
                {section.questions.map((item) => {
                  const key = `${section.category}-${item.q}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-paper"
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                      >
                        <span className="pr-4 text-sm font-medium text-ink">{item.q}</span>
                        <span className="shrink-0 text-sea">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="border-t border-line bg-paper px-5 py-4">
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

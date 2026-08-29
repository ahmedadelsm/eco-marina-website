"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { API, apiGet } from "@/lib/api";
import { getVisiblePartners, type Partner } from "@/content/site-content";

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>(getVisiblePartners());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    apiGet<{ content: Record<string, unknown> }>(API.content)
      .then((data) => {
        setPartners(getVisiblePartners(data.content));
      })
      .catch(() => {
        setPartners(getVisiblePartners());
      })
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Partners</h2>
          <p className="mt-4 text-sm text-ink-muted">Loading…</p>
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="brand-accent-heading">
          <h2 className="font-serif text-2xl font-semibold text-ink">Partners</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {partners.map((p) => (
            <div key={p.id} className="flex items-center gap-5 border border-line bg-white px-6 py-5">
              {p.logo ? (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-paper p-2">
                  <Image src={p.logo} alt="" width={48} height={48} className="max-h-10 w-auto object-contain" />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-paper">
                  <span className="font-serif text-lg font-semibold text-brand-blue">{p.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="font-medium text-ink">{p.name}</p>
                {p.location && <p className="mt-1 text-sm text-ink-muted">{p.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

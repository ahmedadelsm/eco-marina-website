import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: "Environmental consulting case studies from Eco Marina — shipping, industrial, wastewater, and coastal projects.",
  path: "/projects",
});

export default function ImpactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Case studies</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink-muted">
        This page has moved. Our project impact is presented through detailed case studies.
      </p>
      <Link href="/projects" className="mt-8 inline-block text-sm font-medium text-sea hover:underline">
        View case studies →
      </Link>
    </section>
  );
}

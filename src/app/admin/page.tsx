"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet } from "@/lib/api";

type Stats = {
  unreadMessages: number;
  totalMessages: number;
  cmsCollections: number;
  maintenanceEnabled: boolean;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiGet<Stats>(API.admin.stats)
      .then(setStats)
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  if (!stats) {
    return <p className="text-ink-muted">Loading dashboard…</p>;
  }

  const cards = [
    { label: "Unread messages", value: stats.unreadMessages, href: "/admin/messages" },
    { label: "Total messages", value: stats.totalMessages, href: "/admin/messages" },
    { label: "CMS collections saved", value: stats.cmsCollections, href: "/admin/homepage" },
    {
      label: "Maintenance mode",
      value: stats.maintenanceEnabled ? "ON" : "OFF",
      href: "/admin/settings",
    },
  ];

  const quickLinks = [
    { label: "Homepage sections", href: "/admin/homepage" },
    { label: "Services", href: "/admin/services" },
    { label: "Insights", href: "/admin/insights" },
    { label: "About page", href: "/admin/about" },
    { label: "SEO", href: "/admin/seo" },
    { label: "Company info", href: "/admin/company" },
    { label: "Case studies", href: "/admin/projects" },
    { label: "Training", href: "/admin/training" },
    { label: "FAQ", href: "/admin/faq" },
    { label: "Hero", href: "/admin/hero" },
    { label: "Page copy", href: "/admin/pages" },
    { label: "Navigation", href: "/admin/navigation" },
    { label: "UI strings", href: "/admin/ui" },
    { label: "Partners", href: "/admin/partners" },
    { label: "Contact page", href: "/admin/contact" },
    { label: "Resources", href: "/admin/resources" },
    { label: "Media library", href: "/admin/media" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-2 text-ink-muted">Overview of your Eco Marina website.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-line bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">{card.label}</p>
            <p className="mt-3 font-serif text-3xl font-semibold text-ink">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-ink">Manage content</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-line bg-white px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-sea hover:text-sea"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {stats.maintenanceEnabled && (
        <div className="mt-8 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Maintenance mode is <strong>on</strong>. Public visitors see the in-progress page.{" "}
          <Link href="/admin/settings" className="font-semibold underline">
            Turn off in Settings
          </Link>
        </div>
      )}
    </div>
  );
}

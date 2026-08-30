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

  const contentGroups = [
    {
      title: "Page content",
      description: "Edit the information visitors read and the items they browse.",
      links: [
        { label: "Homepage", href: "/admin/homepage" },
        { label: "Company", href: "/admin/company" },
        { label: "Services", href: "/admin/services" },
        { label: "Case studies", href: "/admin/projects" },
        { label: "Training", href: "/admin/training" },
        { label: "Insights", href: "/admin/insights" },
        { label: "About", href: "/admin/about" },
        { label: "Resources", href: "/admin/resources" },
      ],
    },
    {
      title: "Site experience",
      description: "Manage shared imagery, navigation, labels, discovery, and enquiries.",
      links: [
        { label: "Hero", href: "/admin/hero" },
        { label: "Navigation", href: "/admin/navigation" },
        { label: "UI strings", href: "/admin/ui" },
        { label: "SEO", href: "/admin/seo" },
        { label: "FAQ", href: "/admin/faq" },
        { label: "Partners", href: "/admin/partners" },
        { label: "Contact", href: "/admin/contact" },
        { label: "Media library", href: "/admin/media" },
      ],
    },
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
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {contentGroups.map((group) => (
          <section key={group.title} className="border border-line bg-white p-5 sm:p-6">
            <h2 className="font-serif text-xl font-semibold text-ink">{group.title}</h2>
            <p className="mt-1 text-sm text-ink-muted">{group.description}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border border-line px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-sea hover:text-sea"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
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

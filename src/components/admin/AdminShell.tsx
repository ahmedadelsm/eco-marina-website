"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, adminLogout, apiGet } from "@/lib/api";

type AdminRole = "super_admin" | "editor";

type NavItem = { href: string; label: string; roles: AdminRole[] };

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", roles: ["super_admin", "editor"] },
      { href: "/admin/messages", label: "Messages", roles: ["super_admin", "editor"] },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/homepage", label: "Homepage", roles: ["super_admin", "editor"] },
      { href: "/admin/company", label: "Company", roles: ["super_admin", "editor"] },
      { href: "/admin/services", label: "Services", roles: ["super_admin", "editor"] },
      { href: "/admin/projects", label: "Case studies", roles: ["super_admin", "editor"] },
      { href: "/admin/training", label: "Training", roles: ["super_admin", "editor"] },
      { href: "/admin/insights", label: "Insights", roles: ["super_admin", "editor"] },
      { href: "/admin/about", label: "About", roles: ["super_admin", "editor"] },
      { href: "/admin/resources", label: "Resources", roles: ["super_admin", "editor"] },
      { href: "/admin/partners", label: "Partners", roles: ["super_admin", "editor"] },
      { href: "/admin/contact", label: "Contact", roles: ["super_admin", "editor"] },
      { href: "/admin/media", label: "Media", roles: ["super_admin", "editor"] },
    ],
  },
  {
    label: "Site setup",
    items: [
      { href: "/admin/hero", label: "Hero", roles: ["super_admin", "editor"] },
      { href: "/admin/pages", label: "Page copy", roles: ["super_admin", "editor"] },
      { href: "/admin/navigation", label: "Navigation", roles: ["super_admin", "editor"] },
      { href: "/admin/ui", label: "UI strings", roles: ["super_admin", "editor"] },
      { href: "/admin/seo", label: "SEO", roles: ["super_admin", "editor"] },
      { href: "/admin/faq", label: "FAQ", roles: ["super_admin", "editor"] },
      { href: "/admin/settings", label: "Settings", roles: ["super_admin", "editor"] },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/admins", label: "Admins", roles: ["super_admin"] },
      { href: "/admin/audit", label: "Audit log", roles: ["super_admin"] },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [authState, setAuthState] = useState<"checking" | "ok" | "denied">(
    isLoginPage ? "ok" : "checking"
  );

  useEffect(() => {
    if (isLoginPage) return;

    apiGet<{ email: string; role: AdminRole }>(API.admin.me)
      .then((d) => {
        setEmail(d.email);
        setRole(d.role);
        setAuthState("ok");
      })
      .catch(() => {
        setAuthState("denied");
        router.replace("/admin/login");
      });
  }, [isLoginPage, router]);

  async function logout() {
    try {
      await adminLogout();
    } catch {
      // Still redirect — server may have invalidated the session.
    }
    router.replace("/admin/login");
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authState === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="text-sm text-ink-muted">Checking access…</p>
      </div>
    );
  }

  if (authState === "denied") {
    return null;
  }

  const visibleGroups = navGroups
    .map((group) => ({ ...group, items: group.items.filter((item) => role && item.roles.includes(role)) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="border-b border-line px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea">Eco Marina</p>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">Admin</p>
          {email && <p className="mt-2 truncate text-xs text-ink-muted">{email}</p>}
          {role && (
            <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-light">
              {role === "super_admin" ? "Super admin" : "Editor"}
            </p>
          )}
        </div>
        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto p-3" aria-label="Admin navigation">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-light">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-sea-light text-sea-dark" : "text-ink-muted hover:bg-paper hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="w-full shrink-0 space-y-2 border-t border-line p-4">
          <Link href="/" className="block text-sm text-ink-muted hover:text-ink">
            ← View website
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Log out
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-line bg-white px-4 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xl font-semibold text-ink">Website administration</p>
              {email && <p className="text-xs text-ink-muted">Signed in as {email}</p>}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="shrink-0 text-sm font-medium text-sea hover:text-sea-dark">
                View site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="shrink-0 whitespace-nowrap rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 sm:px-3"
              >
                Log out
              </button>
            </div>
          </div>
          <nav className="mt-4 lg:hidden" aria-label="Admin navigation">
            <label className="sr-only" htmlFor="admin-navigation">Navigate admin</label>
            <select
              id="admin-navigation"
              value={pathname}
              onChange={(event) => router.push(event.target.value)}
              className="min-h-11 w-full border border-line bg-white px-3 text-sm font-medium text-ink"
            >
              {visibleGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.items.map((item) => (
                    <option key={item.href} value={item.href}>{item.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </nav>
        </header>
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

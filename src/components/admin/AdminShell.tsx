"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, apiGet, apiPost } from "@/lib/api";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/admins", label: "Admins" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    apiGet<{ email: string }>(API.admin.me)
      .then((d) => setEmail(d.email))
      .catch(() => {});
  }, [pathname]);

  async function logout() {
    await apiPost(API.admin.logout, {}).catch(() => {});
    router.replace("/admin/login");
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="relative hidden w-56 shrink-0 border-r border-line bg-white lg:block">
        <div className="border-b border-line px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea">Eco Marina</p>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">Admin</p>
          {email && <p className="mt-2 truncate text-xs text-ink-muted">{email}</p>}
        </div>
        <nav className="space-y-1 p-3">
          {nav.map((item) => {
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
        </nav>
        <div className="absolute bottom-0 w-56 space-y-2 border-t border-line p-4">
          <button type="button" onClick={() => router.push("/")} className="block text-sm text-ink-muted hover:text-ink">
            ← View website
          </button>
          <button type="button" onClick={logout} className="block text-sm text-red-600 hover:text-red-700">
            Sign out
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
            <div className="flex items-center gap-3 lg:hidden">
              <Link href="/" className="text-sm text-sea hover:text-sea-dark">
                View site
              </Link>
              <button type="button" onClick={logout} className="text-sm text-red-600">
                Sign out
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

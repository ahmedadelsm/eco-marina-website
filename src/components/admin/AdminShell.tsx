"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, adminLogout, apiGet } from "@/lib/api";

type AdminRole = "super_admin" | "editor";

const nav = [
  { href: "/admin", label: "Dashboard", roles: ["super_admin", "editor"] as AdminRole[] },
  { href: "/admin/messages", label: "Messages", roles: ["super_admin", "editor"] as AdminRole[] },
  { href: "/admin/content", label: "Content", roles: ["super_admin", "editor"] as AdminRole[] },
  { href: "/admin/admins", label: "Admins", roles: ["super_admin"] as AdminRole[] },
  { href: "/admin/audit", label: "Audit log", roles: ["super_admin"] as AdminRole[] },
  { href: "/admin/settings", label: "Settings", roles: ["super_admin", "editor"] as AdminRole[] },
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
    window.location.href = "/admin/login";
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

  const visibleNav = nav.filter((item) => role && item.roles.includes(role));

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="relative hidden w-56 shrink-0 border-r border-line bg-white lg:block">
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
        <nav className="space-y-1 p-3">
          {visibleNav.map((item) => {
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
              <Link href="/" className="text-sm font-medium text-sea hover:text-sea-dark">
                View site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Log out
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

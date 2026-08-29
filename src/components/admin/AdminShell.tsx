"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="relative hidden w-56 shrink-0 border-r border-line bg-white lg:block">
        <div className="border-b border-line px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea">Eco Marina</p>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">Admin</p>
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
        <div className="absolute bottom-0 w-56 border-t border-line p-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm text-ink-muted hover:text-ink"
          >
            ← View website
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-line bg-white px-4 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-serif text-xl font-semibold text-ink">Website administration</p>
            <Link href="/" className="text-sm text-sea hover:text-sea-dark lg:hidden">
              View site
            </Link>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

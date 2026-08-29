"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";
import { nav, site } from "@/content/site-content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt={site.name} width={120} height={40} className="h-8 w-auto sm:h-9" priority />
        </Link>

        <div className="hidden items-center gap-6 text-sm lg:flex">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link href={item.href} className="font-medium text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="min-w-[200px] border border-line bg-white py-1 shadow-lg">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="block px-4 py-2 text-ink-muted hover:bg-paper hover:text-ink">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="font-medium text-ink-muted hover:text-ink">
                {item.label}
              </Link>
            ),
          )}
          <div className="ml-2 border-l border-line pl-6">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ink-muted hover:text-sea">
              {site.phone}
            </a>
          </div>
          <Button href="/contact" size="sm">
            Contact
          </Button>
        </div>

        <button type="button" className="p-2 lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 py-4 lg:hidden">
          {nav.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="block py-2.5 font-medium" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
              {"children" in item &&
                item.children?.map((child) => (
                  <Link key={child.href} href={child.href} className="block py-2 pl-4 text-sm text-ink-muted" onClick={() => setOpen(false)}>
                    {child.label}
                  </Link>
                ))}
            </div>
          ))}
          <Button href="/contact" className="mt-4 w-full">
            Contact
          </Button>
        </nav>
      )}
    </header>
  );
}

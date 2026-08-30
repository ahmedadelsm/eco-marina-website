"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { LanguageSwitcher } from "@/components/locale/LanguageSwitcher";
import { useCms } from "@/components/cms/CmsProvider";
import { useLocale, useSiteContent } from "@/components/locale/LocaleProvider";
import { useSiteContact } from "@/components/SiteContactInfo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { phone, phoneHref } = useSiteContact();
  const { path } = useLocale();
  const { site, ui } = useSiteContent();
  const { headerNav } = useCms();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="site-brand-bar" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={path("/")} className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={220}
            height={56}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 text-sm lg:flex">
          {headerNav.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link href={path(item.href)} className="font-medium text-ink-muted hover:text-brand-blue">
                  {item.label}
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="min-w-[200px] border border-line bg-white py-1 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={path(child.href)}
                          className="block px-4 py-2.5 text-ink-muted hover:bg-paper hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={path(item.href)} className="font-medium text-ink-muted hover:text-brand-blue">
                {item.label}
              </Link>
            ),
          )}
          <LanguageSwitcher />
          <div className="ml-2 border-l border-line pl-6">
            <a href={phoneHref} className="whitespace-nowrap text-ink-muted hover:text-brand-blue">
              {phone}
            </a>
          </div>
          <Button href={path("/contact")} size="sm">
            {ui.contact}
          </Button>
        </div>

        <button
          type="button"
          className="-mr-1 min-h-11 min-w-11 p-2 lg:hidden"
          aria-label={open ? ui.closeMenu : ui.openMenu}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <svg className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <a href={phoneHref} className="mb-4 block text-sm font-medium text-brand-blue">
            {phone}
          </a>
          {headerNav.map((item) => (
            <div key={item.href}>
              <Link
                href={path(item.href)}
                className="block min-h-11 py-2.5 font-medium leading-6"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {"children" in item &&
                item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={path(child.href)}
                    className="block min-h-10 py-2 pl-4 text-sm text-ink-muted"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
            </div>
          ))}
          <div className="mt-4 border-t border-line pt-4">
            <LanguageSwitcher />
          </div>
          <Button href={path("/contact")} className="mt-4 w-full" onClick={() => setOpen(false)}>
            {ui.contact}
          </Button>
        </nav>
      )}
    </header>
  );
}

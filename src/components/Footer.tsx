"use client";

import Link from "next/link";
import Image from "next/image";
import { useCms } from "@/components/cms/CmsProvider";
import { useSiteContact } from "@/components/SiteContactInfo";
import { useLocale, useSiteContent } from "@/components/locale/LocaleProvider";
import { Icons } from "./Icons";

export function Footer() {
  const { email, phone, office, phoneHref, mailto } = useSiteContact();
  const { path } = useLocale();
  const { site, footerNav, ui } = useSiteContent();
  const { company } = useCms();

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="site-brand-bar" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={200}
              height={50}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-3 text-sm text-white/55">{company.tagline}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-brand-green">{company.motto}</p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <a href={mailto} className="flex items-center gap-2 hover:text-white">
                <Icons.Mail className="h-4 w-4 shrink-0 text-brand-green" /> {email}
              </a>
              <a href={phoneHref} className="flex items-center gap-2 hover:text-white">
                <Icons.Phone className="h-4 w-4 shrink-0 text-brand-green" /> {phone}
              </a>
              <p className="flex items-center gap-2">
                <Icons.MapPin className="h-4 w-4 shrink-0 text-brand-green" /> {office}
              </p>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{ui.pages}</p>
            <ul className="mt-4 space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={path(item.href)} className="text-sm text-white/70 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{ui.connect}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {ui.footerSince} {company.since}. {company.tagline} — {ui.footerServices}{" "}
              {site.operatingRegions.slice(0, 3).join(", ")}, {ui.footerRegions}
            </p>
            <a
              href={company.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-brand-green hover:text-white"
            >
              LinkedIn — Adel Regal →
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} {site.name}. {office}.
        </p>
      </div>
    </footer>
  );
}

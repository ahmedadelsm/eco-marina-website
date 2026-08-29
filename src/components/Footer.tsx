import Link from "next/link";
import { Icons } from "./Icons";
import { footerNav, site } from "@/content/site-content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-xl font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-white/60">{site.tagline}</p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                <Icons.Mail className="h-4 w-4" /> {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
                <Icons.Phone className="h-4 w-4" /> {site.phone}
              </a>
              <p className="flex items-center gap-2">
                <Icons.MapPin className="h-4 w-4" /> {site.office}
              </p>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Pages</p>
            <ul className="mt-4 space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Connect</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              International environmental consultancy. Impact assessment, monitoring, and training since {site.since}.
            </p>
            <a
              href={site.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-sea-light hover:text-white"
            >
              LinkedIn — Adel Regal →
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} {site.name}. {site.office}.
        </p>
      </div>
    </footer>
  );
}

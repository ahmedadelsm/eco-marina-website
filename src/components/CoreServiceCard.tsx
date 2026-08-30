"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleProvider";
import { ArrowRightIcon, CheckIcon } from "./Icon";

type CoreService = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  href: string;
  icon: "assessment" | "monitoring" | "training";
  image: string;
  deliverables: readonly string[];
  sectors: readonly string[];
};

export function CoreServiceCard({ service }: { service: CoreService }) {
  const { path } = useLocale();
  return (
    <Link href={path(service.href)} className="group block border border-line bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="photo-image object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="photo-tint absolute inset-0" aria-hidden />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">{service.shortTitle}</p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-ink group-hover:text-brand-blue">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
          Details <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function ProjectCard({
  project,
  viewLabel = "View case study →",
}: {
  project: {
    slug: string;
    title: string;
    category: string;
    summary: string;
    image: string;
  };
  viewLabel?: string;
}) {
  const { path } = useLocale();
  return (
    <Link href={path(`/projects/${project.slug}`)} className="group block border border-line bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="photo-image object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="photo-tint absolute inset-0" aria-hidden />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">{project.category}</p>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink group-hover:text-brand-blue">{project.title}</h3>
        <p className="mt-2 text-sm text-ink-muted">{project.summary}</p>
        <span className="mt-4 inline-block text-sm font-medium text-brand-blue">{viewLabel}</span>
      </div>
    </Link>
  );
}

export function InsightCard({
  article,
  readLabel = "Read article →",
}: {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    image: string;
  };
  readLabel?: string;
}) {
  const { path } = useLocale();
  return (
    <Link href={path(`/insights/${article.slug}`)} className="group flex flex-col border border-line bg-white">
      <div className="relative aspect-[16/9] overflow-hidden bg-paper">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="photo-image object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="photo-tint absolute inset-0" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-ink-light">
          <span className="font-semibold uppercase tracking-wider text-brand-blue">{article.category}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className="mt-3 font-serif text-xl font-semibold text-ink group-hover:text-brand-blue">{article.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        <span className="mt-4 text-sm font-medium text-brand-blue">{readLabel}</span>
      </div>
    </Link>
  );
}

export function ServiceDetailLayout({
  service,
  children,
  showTitle = true,
}: {
  service: CoreService;
  children: React.ReactNode;
  showTitle?: boolean;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          {showTitle ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-sea">{service.shortTitle}</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">{service.title}</h2>
            </>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-wider text-sea">{service.shortTitle}</p>
          )}
          <p className="mt-4 text-ink-muted leading-relaxed">{service.description}</p>
          {children}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper">
          <Image src={service.image} alt={service.title} fill className="photo-image object-cover" sizes="50vw" />
          <div className="photo-tint absolute inset-0" aria-hidden />
        </div>
      </div>
      <div className="mt-16 grid gap-8 border-t border-line pt-16 sm:grid-cols-2">
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink">Deliverables</h3>
          <ul className="mt-4 space-y-2">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-ink-muted">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sea" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink">Sectors</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.sectors.map((s) => (
              <span key={s} className="border border-line bg-paper px-3 py-1 text-xs text-ink-muted">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

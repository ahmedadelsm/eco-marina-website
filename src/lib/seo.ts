import type { Metadata } from "next";
import { getContent } from "@/content";
import { localePath, openGraphLocale, type Locale } from "@/lib/i18n";

const DEFAULT_OG_IMAGE = "/images/hero-coastal.jpg";
const SITE_URL = "https://eco-marina.com";

export function buildPageMetadata(options: {
  locale?: Locale;
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const locale = options.locale ?? "en";
  const { site } = getContent(locale);
  const pageTitle = options.title;
  const socialTitle = pageTitle ? `${pageTitle} | ${site.name}` : `${site.name} | ${site.tagline}`;
  const description =
    options.description ??
    (locale === "nl"
      ? "Milieu- en sociale effectbeoordeling, monitoringprogramma's en duurzaamheidstraining. Gevestigd in Utrecht, Nederland."
      : "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.");
  const basePath = options.path ?? "/";
  const localizedPath = localePath(locale, basePath === "/" ? "/" : basePath.replace(/^\/nl/, "") || "/");
  const url = `${SITE_URL}${localizedPath === "/" ? "" : localizedPath}`;
  const image = options.image ?? DEFAULT_OG_IMAGE;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const enPath = localePath("en", basePath.replace(/^\/nl/, "") || "/");
  const nlPath = localePath("nl", basePath.replace(/^\/nl/, "") || "/");

  return {
    ...(pageTitle ? { title: pageTitle } : {}),
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}${enPath === "/" ? "" : enPath}`,
        nl: `${SITE_URL}${nlPath}`,
        "x-default": `${SITE_URL}${enPath === "/" ? "" : enPath}`,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: openGraphLocale(locale),
      type: options.type ?? "website",
      images: [{ url: imageUrl, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}

import type { Metadata } from "next";
import { site } from "@/content/site-content";

const DEFAULT_OG_IMAGE = "/images/hero-coastal.jpg";

export function buildPageMetadata(options: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const pageTitle = options.title;
  const socialTitle = pageTitle ? `${pageTitle} | ${site.name}` : `${site.name} | ${site.tagline}`;
  const description =
    options.description ??
    "Environmental and social impact assessment, monitoring programs, and sustainability training. Based in Utrecht, Netherlands.";
  const url = options.path ? `https://eco-marina.com${options.path}` : "https://eco-marina.com/";
  const image = options.image ?? DEFAULT_OG_IMAGE;
  const imageUrl = image.startsWith("http") ? image : `https://eco-marina.com${image}`;

  return {
    ...(pageTitle ? { title: pageTitle } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
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

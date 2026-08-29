import { site } from "@/content/site-content";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: "https://eco-marina.com",
    logo: "https://eco-marina.com/images/logo.png",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Utrecht",
      addressCountry: "NL",
    },
    sameAs: [site.linkedIn],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: "https://eco-marina.com",
    description: site.tagline,
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: "Adel Regal",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: "https://eco-marina.com/images/logo.png",
      },
    },
    mainEntityOfPage: `https://eco-marina.com/insights/${article.slug}`,
    image: article.image.startsWith("http")
      ? article.image
      : `https://eco-marina.com${article.image}`,
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: "https://eco-marina.com",
    description: site.tagline,
    areaServed: site.operatingRegions,
    email: site.email,
    telephone: site.phone,
  };
}

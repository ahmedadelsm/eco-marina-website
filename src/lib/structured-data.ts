export function articleJsonLd(
  article: {
    title: string;
    excerpt: string;
    datePublished: string;
    slug: string;
    image: string;
  },
  publisher: { name: string; domain: string },
  insightPath: string,
) {
  const siteUrl = `https://${publisher.domain}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: "Adel Regal",
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}${insightPath}`,
    image: article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`,
  };
}

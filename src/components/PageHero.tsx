import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, title, description, image, imageAlt }: PageHeroProps) {
  if (image) {
    return (
      <section className="relative min-h-[min(420px,70svh)] overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            className="photo-image object-cover opacity-40 sm:opacity-45"
            sizes="100vw"
            priority
          />
          <div className="page-hero-overlay absolute inset-0" aria-hidden />
          <div className="page-hero-overlay-mobile absolute inset-0 sm:hidden" aria-hidden />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="hero-copy max-w-3xl">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} light as="h1" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} as="h1" />
      </div>
    </section>
  );
}

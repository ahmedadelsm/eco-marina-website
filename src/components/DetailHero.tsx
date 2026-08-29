import Image from "next/image";

type DetailHeroProps = {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function DetailHero({ image, imageAlt = "", eyebrow, title, description, children }: DetailHeroProps) {
  return (
    <section className="relative min-h-[min(360px,65svh)] overflow-hidden bg-ink sm:min-h-[420px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="photo-image object-cover opacity-40 sm:opacity-45"
          priority
          sizes="100vw"
        />
        <div className="page-hero-overlay absolute inset-0" aria-hidden />
        <div className="page-hero-overlay-mobile absolute inset-0 sm:hidden" aria-hidden />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="hero-copy max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white text-balance sm:text-4xl">
            {title}
          </h1>
          {description && <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

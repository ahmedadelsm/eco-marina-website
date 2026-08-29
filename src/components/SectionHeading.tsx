type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
  centered,
  className = "",
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] ${light ? "text-brand-green" : "text-brand-blue"}`}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-serif text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/90" : "text-ink-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

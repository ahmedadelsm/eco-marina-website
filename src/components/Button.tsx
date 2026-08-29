import Link from "next/link";
import { ArrowRightIcon } from "./Icon";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

const variants = {
  primary: "bg-sea text-white hover:bg-sea-dark border border-sea",
  secondary: "bg-ink text-white hover:bg-ink/90 border border-ink",
  outline: "border border-line text-ink hover:border-sea hover:text-sea bg-white",
  ghost: "text-ink hover:text-sea",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ href, variant = "primary", size = "md", children, className = "" }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button type="button" className={classes}>{children}</button>;
}

export function ButtonArrow({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) {
  return (
    <Button href={href} variant={variant} size={size} className={className}>
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </Button>
  );
}

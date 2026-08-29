import Link from "next/link";
import { ArrowRightIcon } from "./Icon";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "outline-light" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "bg-brand-blue text-white hover:bg-brand-blue-dark border border-brand-blue",
  secondary: "bg-ink text-white hover:bg-ink/90 border border-ink",
  outline: "border border-line text-ink hover:border-brand-blue hover:text-brand-blue bg-white",
  "outline-light": "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
  ghost: "text-ink hover:text-brand-blue",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ href, variant = "primary", size = "md", children, className = "", onClick }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
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

import { Icons } from "./Icons";

type ServiceIconName = "assessment" | "monitoring" | "training" | "science" | "regulation" | "globe" | "chart";

const iconMap: Record<ServiceIconName, keyof typeof Icons> = {
  assessment: "ClipboardCheck",
  monitoring: "Activity",
  training: "GraduationCap",
  science: "Flask",
  regulation: "Scale",
  globe: "Globe",
  chart: "TrendingUp",
};

type IconProps = {
  name: ServiceIconName;
  className?: string;
};

export function ServiceIcon({ name, className = "h-6 w-6" }: IconProps) {
  const IconComponent = Icons[iconMap[name]];
  return <IconComponent className={className} />;
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <Icons.Check className={className} />;
}

export function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <Icons.ArrowRight className={className} />;
}

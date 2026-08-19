import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="animate-rise flex items-start gap-4">
      <div className="gradient-hero hidden size-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground sm:flex">
        <Icon className="size-5" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

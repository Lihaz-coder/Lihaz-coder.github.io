import { DemoBadge } from "@/components/dashboard/demo-badge";

interface ModulePageProps {
  title: string;
  description: string;
}

export function ModulePage({ title, description }: ModulePageProps) {
  return (
    <section className="space-y-3 rounded-lg border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <DemoBadge />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  );
}

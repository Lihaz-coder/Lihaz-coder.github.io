interface ModulePageProps {
  title: string;
  description: string;
}

export function ModulePage({ title, description }: ModulePageProps) {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  );
}

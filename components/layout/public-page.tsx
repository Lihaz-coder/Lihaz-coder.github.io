import { PublicNav } from "@/components/layout/public-nav";

interface PublicPageProps {
  title: string;
  description: string;
}

export function PublicPage({ title, description }: PublicPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </main>
    </div>
  );
}

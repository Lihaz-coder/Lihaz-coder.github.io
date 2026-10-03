import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">School Management System</h1>
          <p className="max-w-3xl text-muted-foreground">
            Milestone 1 foundation is ready with Next.js, TypeScript, Tailwind, App Router,
            shadcn/ui baseline configuration, and placeholder modules for dashboard workflows.
          </p>
        </section>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Secure Appwrite integration layer",
            "Role-based modular dashboard architecture",
            "Scalable UI foundation for all school roles",
          ].map((item) => (
            <article key={item} className="rounded-lg border border-border bg-card p-4 text-sm">
              {item}
            </article>
          ))}
        </section>
        <section>
          <Link
            href="/dashboard"
            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Open dashboard shell
          </Link>
        </section>
      </main>
    </div>
  );
}

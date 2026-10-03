import Link from "next/link";
import { Menu } from "lucide-react";

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/students", label: "Students" },
  { href: "/dashboard/teachers", label: "Teachers" },
  { href: "/dashboard/parents", label: "Parents" },
  { href: "/dashboard/classes", label: "Classes" },
  { href: "/dashboard/subjects", label: "Subjects" },
  { href: "/dashboard/attendance", label: "Attendance" },
  { href: "/dashboard/exams", label: "Exams" },
  { href: "/dashboard/results", label: "Results" },
  { href: "/dashboard/fees", label: "Fees" },
  { href: "/dashboard/timetable", label: "Timetable" },
  { href: "/dashboard/homework", label: "Homework" },
  { href: "/dashboard/notices", label: "Notices" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Menu className="h-4 w-4" />
            School Management System
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-[250px_1fr]">
        <aside className="border-r border-border bg-card px-3 py-4">
          <nav className="grid gap-1 text-sm">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-h-[calc(100vh-57px)] px-4 py-6">{children}</main>
      </div>
    </div>
  );
}

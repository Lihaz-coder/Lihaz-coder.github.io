"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/lib/navigation/dashboard-navigation";
import { cn } from "@/lib/utils";

export function SidebarNavigation({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1 px-2 py-4" aria-label="Dashboard navigation">
      {dashboardNavigation.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              compact && "justify-center px-2"
            )}
            title={item.title}
          >
            <Icon className="size-4" />
            {!compact ? <span>{item.title}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

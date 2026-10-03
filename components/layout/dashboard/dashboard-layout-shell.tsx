"use client";

import { useState } from "react";

import { DashboardContainer } from "@/components/layout/dashboard/dashboard-container";
import { Sidebar } from "@/components/layout/dashboard/sidebar";
import { Topbar } from "@/components/layout/dashboard/topbar";
import { cn } from "@/lib/utils";

export function DashboardLayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} />
      <DashboardContainer className={cn("grid gap-0", collapsed ? "md:grid-cols-[88px_1fr]" : "md:grid-cols-[268px_1fr]") }>
        <Sidebar compact={collapsed} />
        <main className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6">{children}</main>
      </DashboardContainer>
    </div>
  );
}

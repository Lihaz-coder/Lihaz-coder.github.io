import { PanelLeft } from "lucide-react";

import { DashboardContainer } from "@/components/layout/dashboard/dashboard-container";
import { DashboardBreadcrumbs } from "@/components/layout/dashboard/breadcrumbs";
import { MobileNavigation } from "@/components/layout/dashboard/mobile-navigation";
import { NotificationMenu } from "@/components/layout/dashboard/notification-menu";
import { SearchCommand } from "@/components/layout/dashboard/search-command";
import { UserMenu } from "@/components/layout/dashboard/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export function Topbar({ collapsed, onToggleSidebar }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <DashboardContainer className="flex h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <MobileNavigation />
          <Button
            variant="outline"
            size="icon"
            className="hidden md:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleSidebar}
          >
            <PanelLeft className="size-4" />
          </Button>
          <div className="hidden md:block">
            <DashboardBreadcrumbs />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SearchCommand />
          <ThemeToggle />
          <NotificationMenu />
          <UserMenu />
        </div>
      </DashboardContainer>
    </header>
  );
}

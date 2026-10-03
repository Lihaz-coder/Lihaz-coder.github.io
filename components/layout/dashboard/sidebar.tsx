import { SidebarFooter } from "@/components/layout/dashboard/sidebar-footer";
import { SidebarHeader } from "@/components/layout/dashboard/sidebar-header";
import { SidebarNavigation } from "@/components/layout/dashboard/sidebar-navigation";

export function Sidebar({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="hidden border-r border-border bg-card md:sticky md:top-16 md:flex md:h-[calc(100vh-4rem)] md:flex-col">
      <SidebarHeader compact={compact} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SidebarNavigation compact={compact} />
      </div>
      <SidebarFooter compact={compact} />
    </aside>
  );
}

import { School } from "lucide-react";

import { DemoBadge } from "@/components/dashboard/demo-badge";

export function SidebarHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-3 border-b border-border p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <School className="size-4 text-primary" />
        {!compact ? <span>School Management</span> : null}
      </div>
      {!compact ? <DemoBadge /> : null}
    </div>
  );
}

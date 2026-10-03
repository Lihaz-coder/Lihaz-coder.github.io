import { BadgeHelp } from "lucide-react";

export function SidebarFooter({ compact = false }: { compact?: boolean }) {
  return (
    <div className="border-t border-border p-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <BadgeHelp className="size-3.5" />
        {!compact ? <span>Help center coming soon.</span> : null}
      </div>
    </div>
  );
}

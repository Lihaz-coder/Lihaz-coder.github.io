import type { LucideIcon } from "lucide-react";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  disabled?: boolean;
}

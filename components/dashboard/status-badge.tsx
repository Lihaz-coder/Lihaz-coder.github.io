import { Badge } from "@/components/ui/badge";

type StatusType =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "PAID"
  | "UNPAID"
  | "PARTIAL"
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "EXCUSED"
  | "PUBLISHED"
  | "DRAFT";

const statusMap: Record<StatusType, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }> = {
  ACTIVE: { label: "Active", variant: "success" },
  INACTIVE: { label: "Inactive", variant: "secondary" },
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "destructive" },
  PAID: { label: "Paid", variant: "success" },
  UNPAID: { label: "Unpaid", variant: "destructive" },
  PARTIAL: { label: "Partial", variant: "warning" },
  PRESENT: { label: "Present", variant: "success" },
  ABSENT: { label: "Absent", variant: "destructive" },
  LATE: { label: "Late", variant: "warning" },
  EXCUSED: { label: "Excused", variant: "secondary" },
  PUBLISHED: { label: "Published", variant: "default" },
  DRAFT: { label: "Draft", variant: "outline" },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusMap[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

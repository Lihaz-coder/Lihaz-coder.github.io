import { DialogShowcase } from "@/components/dashboard/dialog-showcase";
import { StudentTableDemo } from "@/components/dashboard/student-table-demo";
import { PageHeader } from "@/components/layout/dashboard/page-header";

export default function StudentsModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Reusable data table patterns, row actions, and confirmation flows for student management UI."
      />
      <StudentTableDemo />
      <DialogShowcase />
    </div>
  );
}

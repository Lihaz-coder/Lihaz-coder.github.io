import { StudentFormDemo } from "@/components/dashboard/student-form-demo";
import { PageHeader } from "@/components/layout/dashboard/page-header";

export default function SettingsModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Form design system examples using React Hook Form, Zod, and shadcn components."
      />
      <StudentFormDemo />
    </div>
  );
}

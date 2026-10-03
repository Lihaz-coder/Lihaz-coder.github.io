import {
  CalendarClock,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  NotebookPen,
  ReceiptText,
  School,
  Settings,
  UserCheck,
  Users,
  BookOpen,
  FileBarChart2,
  Bell,
  ListChecks,
  UserRoundCog,
} from "lucide-react";

import type { DashboardNavItem } from "@/types/navigation";

export const dashboardNavigation: DashboardNavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/dashboard/students", icon: GraduationCap },
  { title: "Teachers", href: "/dashboard/teachers", icon: UserCheck },
  { title: "Parents", href: "/dashboard/parents", icon: Users },
  { title: "Classes", href: "/dashboard/classes", icon: School },
  { title: "Subjects", href: "/dashboard/subjects", icon: BookOpen },
  { title: "Attendance", href: "/dashboard/attendance", icon: ClipboardList },
  { title: "Exams", href: "/dashboard/exams", icon: NotebookPen },
  { title: "Results", href: "/dashboard/results", icon: ListChecks },
  { title: "Fees", href: "/dashboard/fees", icon: ReceiptText },
  { title: "Timetable", href: "/dashboard/timetable", icon: CalendarClock },
  { title: "Homework", href: "/dashboard/homework", icon: FileBarChart2 },
  { title: "Notices", href: "/dashboard/notices", icon: Bell },
  { title: "Reports", href: "/dashboard/reports", icon: UserRoundCog },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const quickSearchGroups = [
  {
    heading: "Students",
    items: [
      { label: "Students list", href: "/dashboard/students" },
      { label: "Student attendance", href: "/dashboard/attendance" },
    ],
  },
  {
    heading: "Teachers",
    items: [
      { label: "Teachers list", href: "/dashboard/teachers" },
      { label: "Teacher timetable", href: "/dashboard/timetable" },
    ],
  },
  {
    heading: "Academics",
    items: [
      { label: "Classes", href: "/dashboard/classes" },
      { label: "Subjects", href: "/dashboard/subjects" },
      { label: "Exams", href: "/dashboard/exams" },
      { label: "Homework", href: "/dashboard/homework" },
    ],
  },
  {
    heading: "Administration",
    items: [
      { label: "Fees", href: "/dashboard/fees" },
      { label: "Notices", href: "/dashboard/notices" },
      { label: "Reports", href: "/dashboard/reports" },
      { label: "Settings", href: "/dashboard/settings" },
      { label: "Parents", href: "/dashboard/parents" },
    ],
  },
] as const;

export const placeholderUser = {
  name: "Demo Admin",
  email: "admin.demo@school.local",
  role: "ADMIN",
  initials: "DA",
};

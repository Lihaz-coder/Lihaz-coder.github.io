import { DemoBadge } from "@/components/dashboard/demo-badge";
import { DashboardCharts } from "@/components/dashboard/overview-charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/layout/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities, stats, upcomingEvents } from "@/lib/mock-data/dashboard";

export default function DashboardModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Professional analytics shell for administrators, teachers, and staff."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} change={item.change} />
        ))}
      </div>

      <DashboardCharts />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming events</CardTitle>
            <DemoBadge />
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="rounded-md border border-border p-3">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date} · {event.location}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent activity</CardTitle>
            <DemoBadge />
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivities.map((activity) => (
              <p key={activity} className="rounded-md border border-border p-3 text-sm text-muted-foreground">
                {activity}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

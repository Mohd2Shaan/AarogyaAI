
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PatientDashboardSkeleton } from '@/components/skeletons';
import { UpcomingAppointmentsClient } from '@/components/patient/upcoming-appointments-client';
import { QuickActionCards } from '@/components/patient/quick-action-cards';

export default function PatientDashboard() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Your health hub. Access key features from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuickActionCards />
          </CardContent>
        </Card>
      </div>

      <div className="grid auto-rows-max items-start gap-8">
        <Suspense fallback={<PatientDashboardSkeleton />}>
            <UpcomingAppointmentsClient />
        </Suspense>
      </div>
    </div>
  );
}

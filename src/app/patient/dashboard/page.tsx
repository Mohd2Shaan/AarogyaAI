import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PatientDashboardSkeleton } from '@/components/skeletons';

const ActivityLogger = dynamic(() => import('@/components/patient/activity-logger').then(mod => mod.ActivityLogger), {
    ssr: false,
    loading: () => <PatientDashboardSkeleton />
});

const UpcomingAppointments = dynamic(() => import('@/components/patient/upcoming-appointments').then(mod => mod.UpcomingAppointments), {
    ssr: false,
    loading: () => <PatientDashboardSkeleton />
});

export default function PatientDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity Log</CardTitle>
            <CardDescription>
              Log your meals, medication, and activities. This helps your
              doctor understand your progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<PatientDashboardSkeleton />}>
                <ActivityLogger />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Suspense fallback={<PatientDashboardSkeleton />}>
            <UpcomingAppointments />
        </Suspense>
      </div>
    </div>
  );
}

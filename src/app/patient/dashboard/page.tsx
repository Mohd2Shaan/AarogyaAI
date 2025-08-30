
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PatientDashboardSkeleton } from '@/components/skeletons';
import { PatientActivityClient } from '@/components/patient/patient-activity-client';
import { UpcomingAppointmentsClient } from '@/components/patient/upcoming-appointments-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

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
              <PatientActivityClient />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus />
                    Connect with Specialist
                </CardTitle>
                <CardDescription>
                    Find and book an appointment with a specialist.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Need to see a specialist like a cardiologist or dermatologist? You can request a consultation here.
                </p>
                <Button asChild className="w-full">
                    <Link href="/patient/connect-specialist">
                        Find a Specialist
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Suspense fallback={<PatientDashboardSkeleton />}>
            <UpcomingAppointmentsClient />
        </Suspense>
      </div>
    </div>
  );
}

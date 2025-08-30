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
import { AiChatAssistantClient } from '@/components/patient/ai-chat-assistant-client';

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
        <Suspense fallback={<PatientDashboardSkeleton />}>
          <AiChatAssistantClient />
        </Suspense>
        <Suspense fallback={<PatientDashboardSkeleton />}>
            <UpcomingAppointmentsClient />
        </Suspense>
      </div>
    </div>
  );
}

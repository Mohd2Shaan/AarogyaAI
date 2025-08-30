import { Suspense } from 'react';
import { QuickActionCardsClient } from '@/components/doctor/quick-action-cards-client';
import { TodaysAppointments } from '@/components/doctor/todays-appointments';
import { PatientListClient } from '@/components/doctor/patient-list-client';
import { AiAssistantCardClient } from '@/components/doctor/ai-assistant-card-client';
import { InviteColleagueCardClient } from '@/components/doctor/invite-colleague-card-client';
import { DoctorDashboardSkeleton } from '@/components/skeletons';

export default function DoctorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good morning, Dr. Aarav
        </h1>
        <p className="text-muted-foreground">
          Ready to help your patients today?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <TodaysAppointments />
        </div>
        <div className="space-y-8 hidden xl:block">
          {/* This space can be used for other cards on larger screens if needed */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Suspense fallback={<DoctorDashboardSkeleton />}>
          <QuickActionCardsClient />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
           <Suspense fallback={<DoctorDashboardSkeleton />}>
            <PatientListClient />
          </Suspense>
        </div>
        <div className="space-y-8">
           <Suspense fallback={<DoctorDashboardSkeleton />}>
            <AiAssistantCardClient />
          </Suspense>
           <Suspense fallback={<DoctorDashboardSkeleton />}>
            <InviteColleagueCardClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

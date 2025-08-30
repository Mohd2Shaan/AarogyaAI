import { Suspense } from 'react';
import { DoctorDashboardSkeleton } from '@/components/skeletons';
import { AiAssistantCardClient } from '@/components/doctor/ai-assistant-card-client';
import { InviteColleagueCardClient } from '@/components/doctor/invite-colleague-card-client';
import { PatientListClient } from '@/components/doctor/patient-list-client';
import { QuickActionCardsClient } from '@/components/doctor/quick-action-cards-client';


export default function DoctorDashboard() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Quick Actions</h1>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-8">
            <Suspense fallback={<DoctorDashboardSkeleton />}>
                <QuickActionCardsClient />
            </Suspense>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <Suspense fallback={<DoctorDashboardSkeleton />}>
                    <PatientListClient />
                </Suspense>
            </div>

            <div className="grid auto-rows-max items-start gap-4 md:gap-8">
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

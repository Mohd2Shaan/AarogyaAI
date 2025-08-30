import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  FileText,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DoctorDashboardSkeleton } from '@/components/skeletons';

const PatientList = dynamic(() => import('@/components/doctor/patient-list').then(mod => mod.PatientList), {
  ssr: false,
  loading: () => <DoctorDashboardSkeleton />,
});

const QuickActionCards = dynamic(() => import('@/components/doctor/quick-action-cards').then(mod => mod.QuickActionCards), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />,
});

const AiAssistantCard = dynamic(() => import('@/components/doctor/ai-assistant-card').then(mod => mod.AiAssistantCard), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />,
});

const InviteColleagueCard = dynamic(() => import('@/components/doctor/invite-colleague-card').then(mod => mod.InviteColleagueCard), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />,
});


export default function DoctorDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Suspense fallback={<DoctorDashboardSkeleton />}>
                <QuickActionCards />
            </Suspense>
            <Suspense fallback={<DoctorDashboardSkeleton />}>
                <PatientList />
            </Suspense>
        </div>

        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <Suspense fallback={<DoctorDashboardSkeleton />}>
                <AiAssistantCard />
            </Suspense>
             <Suspense fallback={<DoctorDashboardSkeleton />}>
                <InviteColleagueCard />
            </Suspense>
        </div>
    </div>
  );
}

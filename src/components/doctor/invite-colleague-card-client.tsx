'use client';

import dynamic from 'next/dynamic';
import { DoctorDashboardSkeleton } from '@/components/skeletons';

const InviteColleagueCard = dynamic(() => import('@/components/doctor/invite-colleague-card').then(mod => mod.InviteColleagueCard), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />,
});

export function InviteColleagueCardClient() {
    return <InviteColleagueCard />;
}

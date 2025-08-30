'use client';

import dynamic from 'next/dynamic';
import { DoctorDashboardSkeleton } from '@/components/skeletons';

const QuickActionCards = dynamic(() => import('@/components/doctor/quick-action-cards').then(mod => mod.QuickActionCards), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />,
});

export function QuickActionCardsClient() {
    return <QuickActionCards />;
}

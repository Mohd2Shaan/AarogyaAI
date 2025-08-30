'use client';

import dynamic from 'next/dynamic';
import { DoctorDashboardSkeleton } from '@/components/skeletons';

const AiAssistantCard = dynamic(() => import('@/components/doctor/ai-assistant-card').then(mod => mod.AiAssistantCard), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />,
});

export function AiAssistantCardClient() {
    return <AiAssistantCard />;
}

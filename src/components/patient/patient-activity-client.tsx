'use client';

import dynamic from 'next/dynamic';
import { PatientDashboardSkeleton } from '@/components/skeletons';

const ActivityLogger = dynamic(() => import('@/components/patient/activity-logger').then(mod => mod.ActivityLogger), {
    ssr: false,
    loading: () => <PatientDashboardSkeleton />
});

export function PatientActivityClient() {
    return <ActivityLogger />;
}

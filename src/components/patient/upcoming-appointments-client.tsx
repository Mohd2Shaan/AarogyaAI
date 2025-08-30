'use client';

import dynamic from 'next/dynamic';
import { PatientDashboardSkeleton } from '@/components/skeletons';

const UpcomingAppointments = dynamic(() => import('@/components/patient/upcoming-appointments').then(mod => mod.UpcomingAppointments), {
    ssr: false,
    loading: () => <PatientDashboardSkeleton />
});

export function UpcomingAppointmentsClient() {
    return <UpcomingAppointments />;
}

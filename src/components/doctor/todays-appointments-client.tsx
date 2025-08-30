'use client';

import dynamic from 'next/dynamic';
import { AppointmentListSkeleton } from '@/components/skeletons';

const TodaysAppointments = dynamic(() => import('@/components/doctor/todays-appointments').then(mod => mod.TodaysAppointments), {
    ssr: false,
    loading: () => <AppointmentListSkeleton />,
});

export function TodaysAppointmentsClient() {
    return <TodaysAppointments />;
}

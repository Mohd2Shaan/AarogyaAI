'use client';

import dynamic from 'next/dynamic';
import { DoctorDashboardSkeleton } from '@/components/skeletons';

const PatientList = dynamic(() => import('@/components/doctor/patient-list').then(mod => mod.PatientList), {
  ssr: false,
  loading: () => <DoctorDashboardSkeleton />,
});

export function PatientListClient() {
    return <PatientList />;
}

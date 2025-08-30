
'use client';

import dynamic from 'next/dynamic';
import { DoctorDashboardSkeleton } from '@/components/skeletons';
import { PatientList } from './patient-list';

// This component is kept for dashboard usage where it doesn't need external search term.
// The patients page now uses PatientList directly.
export function PatientListClient() {
    return (
        <PatientList searchTerm="" />
    );
}

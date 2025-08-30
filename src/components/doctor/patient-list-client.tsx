'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { DoctorDashboardSkeleton } from '@/components/skeletons';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

const PatientList = dynamic(() => import('@/components/doctor/patient-list').then(mod => mod.PatientList), {
  ssr: false,
  loading: () => <DoctorDashboardSkeleton />,
});

export function PatientListClient() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search patients by name..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <PatientList searchTerm={searchTerm} />
        </div>
    );
}

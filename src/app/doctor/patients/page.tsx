
'use client';

import { PatientList } from '@/components/doctor/patient-list';

interface PatientsPageProps {
  searchTerm?: string;
}

export default function PatientsPage({ searchTerm = '' }: PatientsPageProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
        <p className="text-muted-foreground">Search, view, and manage your patient records.</p>
      </div>
      <PatientList searchTerm={searchTerm} />
    </div>
  );
}

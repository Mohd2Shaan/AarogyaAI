'use client';

import { PatientList } from '@/components/doctor/patient-list';

export default function PatientsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Patient Records</h1>
      <PatientList />
    </div>
  );
}

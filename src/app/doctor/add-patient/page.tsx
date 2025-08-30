'use client';

import { AddPatientForm } from '@/components/doctor/add-patient-form';

export default function AddPatientPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Add New Patient</h1>
      <p className="text-muted-foreground mb-8">
        Fill in the details below to add a new patient to your roster.
      </p>
      <AddPatientForm />
    </div>
  );
}

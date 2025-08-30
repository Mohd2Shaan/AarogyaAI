'use client';

import { UpcomingAppointments } from '@/components/patient/upcoming-appointments';

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Appointments</h1>
      <UpcomingAppointments />
    </div>
  );
}

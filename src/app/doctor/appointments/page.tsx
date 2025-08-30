'use client';

import { TodaysAppointments } from '@/components/doctor/todays-appointments';

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Appointments</h1>
      <TodaysAppointments />
    </div>
  );
}
